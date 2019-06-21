"use strict";

const router = require("express").Router();

router.get("/", (req, res) => {
    res.sendfile('landingPage.html', { root: __dirname + "/../static" } );
});

module.exports = router;
