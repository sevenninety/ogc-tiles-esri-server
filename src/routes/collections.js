const debug = require("debug")("routes/collections");
const router = require("express").Router();
const proxy = require("express-http-proxy");
const utils = require("./utils");

////////////////////////////////////////
// Get generic request to "collections"
////////////////////////////////////////
router.get(
    "/",

    proxy(process.env.ESRI_SERVICE, {
        proxyReqPathResolver: req => {
            return `${process.env.ESRI_SERVICE}/MapServer?f=json`;
        },
        userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
            // Build the basic Collection array informaiton
            const data = JSON.parse(proxyResData.toString("utf8"));

            // Assume title and id = service name
            const id = utils.GetMapServiceName();
            const title = utils.GetMapServiceName();
            const description = data.description;

            const bbox = utils.getBbox(data);
            const crsLink = utils.getCRSLink(data);

            const collection = {
                id: id,
                title: title,
                description: description,
                extent: {
                    spatial: { bbox, crs: crsLink }
                },
                crs: [crsLink, crsLink]
            };

            return {collections: {collection}};
        }
    })
);

// This one looks for the specific collection, including style information
router.get(
    "/:CollectionId",
    proxy(process.env.ESRI_SERVICE, {
        proxyReqPathResolver: req => {
            return `${process.env.ESRI_SERVICE}/MapServer?f=json`;
        },
        userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
            // Get the specific collection information
            const data = JSON.parse(proxyResData.toString("utf8"));

            // Assume title and id = service name
            const id = utils.GetMapServiceName();
            const title = utils.GetMapServiceName();
            const description = data.description;

            // Do a check that we actually are getting the right collection
            if (userReq.params.CollectionId != id) 
            {
                //TODO: Throw some kind of error
            }

            const bbox = utils.getBbox(data);
            const crsLink = utils.getCRSLink(data);

            // In ArcGIS we don't have the concept of styles for Raster tiles
            // Therefore we are going to use the name as the style
            const styles = [ { style: id, title: title} ];

            const mapCRSSetLink = [ { 
                id: apServerJson.fullExtent.spatialReference.latestWkid,
                links: [ { href: crsLink, type: "application/xml", "rel": "describedBy" } ]
            }];

            return  userReq.params.CollectionId;
        }
    })
);

/*
    collections = {
        links: [
            {
                href: "http://data.example.org/collections.json",
                rel: "self",
                type: "application/json",
                title: "this document"
            }
        ],
        collections: [
            {
                id: "address",
                title: "address",
                description: "An address.",
                links: [
                    {
                        href: "http://data.example.com/collections/buildings/items",
                        rel: "items"
                    }
                ],
                extent: {
                    spatial: {
                        bbox: [[-180, -90, 180, 90]],
                        crs: "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
                    },
                    temporal: {
                        interval: [["2011-11-11T12:22:11Z", null]],
                        trs: "http://www.opengis.net/def/uom/ISO-8601/0/Gregorian"
                    }
                },
                crs: ["http://www.opengis.net/def/crs/OGC/1.3/CRS84", "http://www.opengis.net/def/crs/EPSG/0/4326"]
            }
        ]
    };

    res.send(collections);
});

router.get("/:collectionId/tiles/:styleId/:tileMatrixSetId/:tileMatrix/:tileRow/:tileCol", (req, res) => {
    res.send("tile by collection");
});

router.get("/:collectionId/tiles/:styleId/:tileMatrixSetId/:tileMatrix/:tileRow/:tileCol/info", (req, res) => {
    res.send("tile info by collection");
});
*/
module.exports = router;
