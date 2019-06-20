const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const yaml = require("js-yaml");
const path = require("path");
const fs = require("fs");

// Routes
const conformance = require("./conformance");
const tileMatrixSets = require("./tileMatrixSets");
const tiles = require("./tiles");
const collections = require("./collections");
const landingPage = require("./landingPage");

// Documentation libraries
const swaggerDocument = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname + "../../../openapi.yaml"), "utf8"));

router.use("/", landingPage);

// Add path for swagger documentation
router.use("/api", swaggerUi.serve);
router.get("/api", swaggerUi.setup(swaggerDocument));

// Add others
router.use("/conformance", conformance);
router.use("/collections", collections);
router.use("/tileMatrixSets", tileMatrixSets);
router.use("/tiles", tiles);

module.exports = router;
