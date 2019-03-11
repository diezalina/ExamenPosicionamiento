var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var PDF = require('pdfkit');
var fs = require('fs');

var routes = require("./routes");
var passportsetup = require("./passportsetup");
var app = express();

mongoose.connect("mongodb://10am:alina10@ds261440.mlab.com:61440/examen-posicionamiento");
//mongoose.connect("mongodb://localhost:27017/examen-posicionamiento");


var publicScript = path.join(__dirname,'scripts');
app.use('/scripts', express.static(publicScript));

var publicPath = path.join(__dirname,'public');
app.use('/imgs', express.static(publicPath));

var pdfPath = path.join(__dirname,'PDF');
app.use('/docs', express.static(pdfPath));

passportsetup();

app.set("port", process.env.PORT || 3000);

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret:"TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize({
    userProperty: "usuario"
}));
app.use(passport.session());

app.use(routes);

app.listen(app.get("port"), () => {
    console.log("La aplicación inició por el puerto "+ app.get("port"));
});