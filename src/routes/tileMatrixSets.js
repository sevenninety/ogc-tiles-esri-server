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

function getTileMatrix(info) {
    // Create matrix structure
    const tileMatrixSet = {
        type: "TileMatrixSet",
        identifier: "default",
        title: "Google Maps Compatible for the World",
        supportedCrs: "http://www.opengis.net/def/crs/EPSG/0/3857",
        wellKnownScaleSet: "http://www.opengis.net/def/wkss/OGC/1.0/GoogleMapsCompatible",
        tileMatrix: [{
            type: "TileMatrix",
            identifier: 0,
            matrixHeight: 1,
            matrixWidth: 1,
            tileHeight: 256,
            tileWidth: 256,
            scaleDenominator: 559082264.0287178,
            topLeftCorner: [-20037508.34278925, 20037508.34278925]
        }],
        boundingBox: [
            {
                type: "BoundingBox",
                crs: "http://www.opengis.net/def/crs/EPSG/0/3857",
                lowerCorner: [-2.0037507067161843E7, -1.9971868880408604E7],
                upperCorner: [2.0037507067161843E7, 1.997186888040863E7]
            }
        ]
    };

    return tileMatrixSet;
}

module.exports = router;
