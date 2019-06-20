const debug = require("debug")("routes/collections");
const router = require("express").Router();
const proxy = require("express-http-proxy");
const utils = require("./utils");

// Get generic request to "collections"
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
            const crs = utils.getCRS(data);

            const collection = {
                id: id,
                title: title,
                description: description,
                extent: {
                    spatial: { bbox, crs }
                },
                crs: [crs, crs]
            };

            return { collections: [collection] };
        }
    })
);

// This one looks for the specific collection.
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
