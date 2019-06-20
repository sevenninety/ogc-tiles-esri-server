const debug = require("debug")("routes/tiles");
const router = require("express").Router();
const proxy = require("express-http-proxy");

router.get(
    "/:tileMatrixSetId/:tileMatrix/:tileRow/:tileCol",
    proxy(process.env.ESRI_SERVICE, {
        proxyReqPathResolver: (req) => {
            return `${process.env.ESRI_SERVICE}/MapServer/tile/${req.params.tileMatrix}/${req.params.tileRow}/${req.params.tileCol}`;
        }
    })
);

router.get("/:tileMatrixSetId/:tileMatrix/:tileRow/:tileCol/info", (req, res) => {
    res.send("tile info");
});

module.exports = router;
