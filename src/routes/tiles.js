const debug = require("debug")("routes/tiles");
const router = require("express").Router();
const proxy = require("express-http-proxy");

// Gets a tile
router.get(
    "/:tileMatrixSetId/:tileMatrix/:tileRow/:tileCol",
    proxy(process.env.ESRI_SERVICE, {
        proxyReqPathResolver: req => {
            return `${process.env.ESRI_SERVICE}/MapServer/tile/${req.params.tileMatrix}/${req.params.tileRow}/${req.params.tileCol}`;
        }
    })
);

// Gets a tile's info
router.get("/:tileMatrixSetId/:tileMatrix/:tileRow/:tileCol/info", (req, res) => {
    const info = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry: {
                    type: "Point"
                },
                properties: {},
                links: [
                    {
                        href: "http://data.example.com/buildings/123",
                        rel: "next",
                        type: "application/geo+json",
                        hreflang: "en"
                    }
                ]
            }
        ],
        links: [
            {
                href: "http://data.example.com/buildings/123",
                rel: "next",
                type: "application/geo+json",
                hreflang: "en"
            }
        ],
        timeStamp: "string",
        numberMatched: 0,
        numberReturned: 0
    };

    res.send(info);
});

module.exports = router;
