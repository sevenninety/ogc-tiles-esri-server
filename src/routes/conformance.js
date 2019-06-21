"use strict";

const router = require("express").Router();

// Not sure what to send here - this is copied from the OGC swagger page
router.get("/", (req, res) => {
    const conformance = {
        links: [
            "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/req/core",
            "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/req/multitile",
            "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/req/info"
        ]
    };

    res.send(conformance);
});

module.exports = router;
