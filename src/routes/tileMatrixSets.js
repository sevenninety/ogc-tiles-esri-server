const debug = require("debug")("routes/tileMatrixSets");
const router = require("express").Router();
const proxy = require("express-http-proxy");
const utils = require("./utils");

// Gets all tile matrixes
router.get(
    "/",
    proxy(process.env.ESRI_SERVICE, {
        proxyReqPathResolver: req => {
            return `${process.env.ESRI_SERVICE}/MapServer?f=json`;
        },
        userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
            const data = JSON.parse(proxyResData.toString("utf8"));
            return [utils.getTileMatrix(data)];
        }
    })
);

// Gets a tile matrixe
router.get(
    "/:tileMatrixSetId",
    proxy(process.env.ESRI_SERVICE, {
        proxyReqPathResolver: req => {
            return `${process.env.ESRI_SERVICE}/MapServer?f=json`;
        },
        userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
            const data = JSON.parse(proxyResData.toString("utf8"));
            return utils.getTileMatrix(data);
        }
    })
);





module.exports = router;
