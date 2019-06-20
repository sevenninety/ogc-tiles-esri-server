const debug = require("debug")("routes/tileMatrixSets");
const router = require("express").Router();
const proxy = require("express-http-proxy");

router.get(
    "/",
    proxy(process.env.ESRI_SERVICE, {
        proxyReqPathResolver: req => {
            return `${process.env.ESRI_SERVICE}/MapServer?f=json`;
        },
        userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
            const data = JSON.parse(proxyResData.toString("utf8"));
            return [getTileMatrix(data)];
        }
    })
);

router.get(
    "/:tileMatrixSetId",
    proxy(process.env.ESRI_SERVICE, {
        proxyReqPathResolver: req => {
            return `${process.env.ESRI_SERVICE}/MapServer?f=json`;
        },
        userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
            const data = JSON.parse(proxyResData.toString("utf8"));
            return getTileMatrix(data);
        }
    })
);

/**
 * Creates a tileMatrix. FOr now this just returns the Google schema.
 * @param {object} info Data from the Esri service
 */
function getTileMatrix(info) {
    // Define data for Google scheme
    const levels = [
        { id: 0, scaleDenominator: 559082264.0287178, width: 1, height: 1 },
        { id: 1, scaleDenominator: 279541132.0143589, width: 2, height: 2 },
        { id: 2, scaleDenominator: 69885283.00358972, width: 4, height: 4 },
        { id: 3, scaleDenominator: 34942641.50179486, width: 8, height: 8 },
        { id: 4, scaleDenominator: 34942641.50179486, width: 16, height: 16 },
        { id: 5, scaleDenominator: 17471320.75089743, width: 32, height: 32 },
        { id: 6, scaleDenominator: 8735660.375448715, width: 64, height: 64 },
        { id: 7, scaleDenominator: 4367830.187724357, width: 128, height: 128 },
        { id: 8, scaleDenominator: 2183915.093862179, width: 256, height: 256 },
        { id: 9, scaleDenominator: 1091957.546931089, width: 512, height: 512 },
        { id: 10, scaleDenominator: 545978.7734655447, width: 1024, height: 1024 },
        { id: 11, scaleDenominator: 272989.3867327723, width: 2048, height: 2048 },
        { id: 12, scaleDenominator: 136494.6933663862, width: 4096, height: 4096 },
        { id: 13, scaleDenominator: 68247.34668319309, width: 8192, height: 8192 },
        { id: 14, scaleDenominator: 34123.67334159654, width: 16384, height: 16384 },
        { id: 15, scaleDenominator: 17061.83667079827, width: 32768, height: 32768 },
        { id: 16, scaleDenominator: 8530.918335399136, width: 65536, height: 65536 },
        { id: 17, scaleDenominator: 4265.459167699568, width: 131072, height: 131072 },
        { id: 18, scaleDenominator: 2132.729583849784, width: 262144, height: 262144 }
    ];

    // Create matrix structure
    const tileMatrixSet = {
        type: "TileMatrixSet",
        identifier: "default",
        title: "Google Maps Compatible for the World",
        supportedCrs: "http://www.opengis.net/def/crs/EPSG/0/3857",
        wellKnownScaleSet: "http://www.opengis.net/def/wkss/OGC/1.0/GoogleMapsCompatible",
        tileMatrix: [],
        boundingBox: [
            {
                type: "BoundingBox",
                crs: "http://www.opengis.net/def/crs/EPSG/0/3857",
                lowerCorner: [-2.0037507067161843e7, -1.9971868880408604e7],
                upperCorner: [2.0037507067161843e7, 1.997186888040863e7]
            }
        ]
    };

    // Process LODS to create a tileMatrix
    for (let level of levels) {
        tileMatrixSet.tileMatrix.push({
            type: "TileMatrix",
            identifier: level.id.toString(),
            matrixHeight: level.height,
            matrixWidth: level.width,
            tileHeight: 256,
            tileWidth: 256,
            scaleDenominator: level.scaleDenominator,
            topLeftCorner: [info.tileInfo.origin.x, info.tileInfo.origin.y]
        });
    }

    return tileMatrixSet;
}

module.exports = router;
