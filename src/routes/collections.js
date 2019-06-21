"use strict";

const debug = require("debug")("routes/collections");
const router = require("express").Router();
const proxy = require("express-http-proxy");
const utils = require("./utils");

////////////////////////////////////////
// Get generic request to "collections"
////////////////////////////////////////
router.get(
    "/",
    proxy(process.env.ESRI_SERVICE_ROOT, {
        proxyReqPathResolver: req => {
            return `${process.env.ESRI_SERVICE_ROOT}/${process.env.DEFAULT_SERVICE}/MapServer?f=json`;
        },
        userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
            // Build the basic Collection array information
            const data = JSON.parse(proxyResData.toString("utf8"));
            return {
                links: [],
                collections: [getCollection(data)]
            };
        }
    })
);

// This one looks for the specific collection, including style information
router.get(
    "/:collectionId",
    proxy(process.env.ESRI_SERVICE_ROOT, {
        proxyReqPathResolver: req => {
            return `${process.env.ESRI_SERVICE_ROOT}/${process.env.DEFAULT_SERVICE}/MapServer?f=json`;
        },
        userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
            // Get the specific collection information
            const data = JSON.parse(proxyResData.toString("utf8"));

            // Get the collection
            const collection = getCollection(data);

            // In ArcGIS we don't have the concept of styles for Raster tiles
            // Therefore we are going to set a default
            collection.styles = [{ style: "default", title: "default", links: [] }];
            collection.defaultStyle = "default";

            collection.mapCRSSetLink = [
                {
                    id: data.fullExtent.spatialReference.latestWkid,
                    links: [{ href: "http://www.opengis.net/def/crs/OGC/1.3/CRS84", type: "application/xml", rel: "describedBy" }]
                }
            ];

            // Just create a single tileMatrixSet
            collection.tileMatrixSetLink = [
                {
                    id: "default",
                    links: [
                        {
                            href: "https://example.com/api/1.0/tileMatrixSet/WebMercatorQuad?f=ogc-tms-1-0",
                            type: "application/vnd.ogc-tms-1-0.tms+json",
                            rel: "tileMatrixSet"
                        }
                    ]
                }
            ];

            return collection;
        }
    })
);

// Display one of the Esri tiles using the styleId as the service name
router.get(
    "/:collectionId/tiles/:styleId/:tileMatrixSetId/:tileMatrix/:tileRow/:tileCol",
    proxy(process.env.ESRI_SERVICE_ROOT, {
        proxyReqPathResolver: req => {
            return `${process.env.ESRI_SERVICE_ROOT}/${req.params.collectionId}/MapServer/tile/${req.params.tileMatrix}/${req.params.tileRow}/${req.params.tileCol}`;
        }
    })
);

router.get("/:collectionId/tiles/:styleId/:tileMatrixSetId/:tileMatrix/:tileRow/:tileCol/info", (req, res) => {
    res.send("tile info by collection");
});

// Creates a collection from a response
function getCollection(data) {
    const bbox = utils.getBbox(data);
    const crsLink = utils.getCRSLink(data);

    // Assume title and id = service name
    return {
        id: utils.getMapServiceName(),
        title: utils.getMapServiceName(),
        description: data.description,
        extent: {
            spatial: { bbox, crs: crsLink }
        },
        crs: [crsLink]
    };
}

module.exports = router;
