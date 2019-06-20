const debug = require("debug")("routes/conformance");
const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("conformance");
});

module.exports = router;
