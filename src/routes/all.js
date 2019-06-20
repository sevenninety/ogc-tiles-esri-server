const router = require("express").Router();

// Routes
const conformance = require("./conformance");
const tileMatrixSets = require("./tileMatrixSets");
const tiles = require("./tiles");
const collections = require("./collections");
const landingPage = require("./landingPage");

// Configure routes
router.use("/", landingPage);
router.use("/conformance", conformance);
router.use("/collections", collections);
router.use("/tileMatrixSets", tileMatrixSets);
router.use("/tiles", tiles);

module.exports = router;
