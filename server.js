const debug = require("debug")("server");
const express = require("express");
const app = express();
const httpProxy = require("http-proxy");

// Set port the service will run on
const port = process.env.PORT || 3000;

// Create a proxy server
const proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    ignorePath: true,
    // Ignore SSL in proxy
    secure: process.env.NODE_TLS_REJECT_UNAUTHORIZED === "0" ? false : true
});

proxy.on("error", function(err) {
    debug(err.message);
});

app.set("port", process.env.PORT || 5050);

app.get("/", (req, res) => {
    res.send("root");
});

app.get("/conformance", (req, res) => {
    res.send("conformance");
});

app.get("/tileMatrixSet", (req, res) => {
    res.send("tileMatrixSet");
});

app.get("/tileMatrixSet", (req, res) => {
    res.send("tileMatrixSet");
});

app.get("/tiles/:tileMatrixSetId/:tileMatrix/:tileRow/:tileCol", (req, res) => {
    proxy.web(req, res, { target: `${process.env.SERVICE_ROOT}/${req.params.tileMatrixSetId}/MapServer/tile/${req.params.tileMatrix}/${req.params.tileRow}/${req.params.tileCol}` });
});

app.get("/tiles/:tileMatrixSetId/:tileMatrix/:tileRow/:tileCol/info", (req, res) => {
    res.send("tile info");
});

app.get("/collections/:collecitonId/tiles/:styleId/:tileMatrixSetId/:tileMatrix/:tileRow/:tileCol", (req, res) => {
    res.send("tile by collection");
});

app.get("/collections/:collecitonId/tiles/:styleId/:tileMatrixSetId/:tileMatrix/:tileRow/:tileCol/info", (req, res) => {
    res.send("tile info by collection");
});

// Start server
debug(`Listening on port ${port}`);
app.listen(port);
