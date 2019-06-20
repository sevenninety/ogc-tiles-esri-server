
const debug = require("debug")("routes/collections");
const router = require("express").Router();

router.get("/:collectionId/tiles/:styleId/:tileMatrixSetId/:tileMatrix/:tileRow/:tileCol", (req, res) => {
    res.send("tile by collection");
});

router.get("/:collectionId/tiles/:styleId/:tileMatrixSetId/:tileMatrix/:tileRow/:tileCol/info", (req, res) => {
    res.send("tile info by collection");
});

module.exports = router;
