const debug = require("debug")("routes/tiles");
const router = require("express").Router();
const proxy = require("express-http-proxy");
const cache = require("node-cache");

router.get(
    "/:tileMatrixSetId/:tileMatrix/:tileRow/:tileCol",
    proxy(process.env.ESRI_SERVICE, {
        proxyReqPathResolver: (req) => {

            /*
            //We thought we needed to invert the TileRow because WMTS 0,0 is top-left  and ArcGIS 0,0 is bottom left
            //And so  we cheated because the max tile row is 2 power x where x is tile matrix  
            var requestTileRow = parseInt(req.params.tileRow);
            var requestTileMatrix = parseInt(req.params.tileMatrix);
            var maxRow = Math.pow(2, requestTileMatrix) - 1;
            var requiredRow = maxRow - requestTileRow;
            var response = `${process.env.ESRI_SERVICE}/MapServer/tile/${req.params.tileMatrix}/${requestTileRow}/${req.params.tileCol}`;
            */
           var response = `${process.env.ESRI_SERVICE}/MapServer/tile/${req.params.tileMatrix}/${req.params.tileRow}/${req.params.tileCol}`;

            return response;
        }
    })
);

router.get("/:tileMatrixSetId/:tileMatrix/:tileRow/:tileCol/info", (req, res) => {
    res.send("tile info");
});

module.exports = router;
