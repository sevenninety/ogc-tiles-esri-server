const debug = require("debug")("routes/tiles");
const router = require("express").Router();
const proxy = require("express-http-proxy");
const cache = require("node-cache");

// Gets a tile
router.get(
    "/:tileMatrixSetId/:tileMatrix/:tileRow/:tileCol",
    proxy(process.env.ESRI_SERVICE, {
        proxyReqPathResolver: req => {

            /*
            //We thought we needed to invert the TileRow because WMTS 0,0 is top-left  and ArcGIS 0,0 is bottom left
            //And so  we cheated because the max tile row is 2 power x where x is tile matrix  
            var requestTileRow = parseInt(req.params.tileRow);
            var requestTileMatrix = parseInt(req.params.tileMatrix);
            var maxRow = Math.pow(2, requestTileMatrix) - 1;
            var requiredRow = maxRow - requestTileRow;
            var response = `${process.env.ESRI_SERVICE}/MapServer/tile/${req.params.tileMatrix}/${requestTileRow}/${req.params.tileCol}`;
            */

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
