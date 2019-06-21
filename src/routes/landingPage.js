const router = require("express").Router();

//var app = express();
router.get("/", (req, res) => {
    //res.redirect("/src/static/landingPage.html");
    //res.set('Content-Type', 'text/html');
    res.sendfile('landingPage.html', { root: __dirname + "/../static" } );
});

//app.use('/', express.static('app', options));

module.exports = router;
