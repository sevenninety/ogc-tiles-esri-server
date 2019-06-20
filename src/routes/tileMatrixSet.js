const debug = require("debug")("routes/tileMatrixSet");
const router = require("express").Router();
const proxy = require("express-http-proxy");

router.get(
    "/",
    proxy(process.env.SERVICE_ROOT, {
        proxyReqPathResolver: req => {
            return `${process.env.SERVICE_ROOT}/${process.env.SERVICE_NAME}/MapServer?f=json`;
        },
        userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
            const data = JSON.parse(proxyResData.toString('utf8'));

            const tileMatrixSet = {
                type: "TileMatrixSet",
                identifier: "default",
                title: "Google Maps Compatible for the World",
                supportedCrs: "http://www.opengis.net/def/crs/EPSG/0/3857",
                wellKnownScaleSet: "http://www.opengis.net/def/wkss/OGC/1.0/GoogleMapsCompatible",
                TileMatrix: [
                    {
                        type: "TileMatrix",
                        identifier: "0",
                        MatrixHeight: 1,
                        MatrixWidth: 1,
                        TileHeight: 256,
                        TileWidth: 256,
                        scaleDenominator: 559082264.028717,
                        topLeftCorner: [-20037508.3427892, 20037508.3427892]
                    }
                ],
                boundingBox: [
                    {
                        type: "BoundingBox",
                        crs: "http://www.opengis.net/def/crs/EPSG/0/3857",
                        lowerCorner: [-20037508.3427892, -20037508.342789],
                        upperCorner: [20037508.3427892, 20037508.3427892]
                    }
                ]
            };

            return tileMatrixSet;
        }
    })
);

router.get("/:tileMatrixSetId", (req, res) => {
    const tileMatrixSet = {
        type: "TileMatrixSet",
        identifier: "default",
        title: "Google Maps Compatible for the World",
        supportedCrs: "http://www.opengis.net/def/crs/EPSG/0/3857",
        wellKnownScaleSet: "http://www.opengis.net/def/wkss/OGC/1.0/GoogleMapsCompatible",
        TileMatrix: [
            {
                type: "TileMatrix",
                identifier: "0",
                MatrixHeight: 1,
                MatrixWidth: 1,
                TileHeight: 256,
                TileWidth: 256,
                scaleDenominator: 559082264.028717,
                topLeftCorner: [-20037508.3427892, 20037508.3427892]
            }
        ],
        boundingBox: [
            {
                type: "BoundingBox",
                crs: "http://www.opengis.net/def/crs/EPSG/0/3857",
                lowerCorner: [-20037508.3427892, -20037508.342789],
                upperCorner: [20037508.3427892, 20037508.3427892]
            }
        ]
    };

    res.status(200).send(tileMatrixSet);
});

module.exports = router;