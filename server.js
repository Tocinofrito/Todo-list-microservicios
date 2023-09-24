// dependencies required for the app
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// render css files
app.use(express.static("public"));

// Ruta principal para renderizar la página
app.get("/", function (req, res) {
    res.render("index");
});

// set app to listen on port 3000
app.listen(3000, function () {
    console.log("servidor pagina principal");
});
