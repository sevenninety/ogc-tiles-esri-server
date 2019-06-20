const debug = require("debug")("routes/collections");
const router = require("express").Router();

router.get("/", (req, res) => {
    collections = {
        links: [
            {
                href: "http://data.example.org/collections.json",
                rel: "self",
                type: "application/json",
                title: "this document"
            },
            {
                href: "http://data.example.org/collections.html",
                rel: "alternate",
                type: "text/html",
                title: "this document as HTML"
            },
            {
                href: "http://schemas.example.org/1.0/foobar.xsd",
                rel: "describedBy",
                type: "application/xml",
                title: "XML schema for Acme Corporation data"
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
                    },
                    {
                        href: "http://example.com/concepts/buildings.html",
                        rel: "describedBy",
                        type: "text/html"
                    },
                    {
                        href: "http://data.example.com/collections/buildings/maps",
                        rel: "maps",
                        type: "text/html"
                    },
                    {
                        href: "http://data.example.com/collections/buildings/tiles",
                        rel: "tiles",
                        type: "text/html"
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

module.exports = router;
