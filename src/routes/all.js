const router = require("express").Router();

// Routes
const conformance = require("./conformance");
const tileMatrixSet = require("./tileMatrixSet");
const tiles = require("./tiles");
const collections = require("./collections");

router.get("/", (req, res) => {
    res.status(200).send();
});

router.use("/conformance", conformance);
router.use("/collections", collections);
router.use("/tileMatrixSet", tileMatrixSet);
router.use("/tiles", tiles);

module.exports = router;
