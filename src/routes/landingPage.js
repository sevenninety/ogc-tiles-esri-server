const router = require("express").Router();

//var app = express();
router.get("/", (req, res) => {
    res.redirect("static/landingPage.html");
});

//app.use('/', express.static('app', options));

module.exports = router;
