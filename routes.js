var express = require("express");
var Usuario = require("./models/usuarios");

var passport = require("passport");
var acl = require("express-acl");

var router = express.Router();

acl.config({
    baseUrl:'/',
    defaultRole:'usuario',
    decodedObjectName:'usuario',
    roleSearchPath:'usuario.role',
});

router.use((req, res, next) => {
    res.locals.currentUsuario = req.usuario;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    if(req.session.passport){
        if(req.usuario){
            req.session.role = req.usuario.role;
        } else {
            req.session.role = "usuario";
        }
    }
    //console.log(req.session);
    next();
});

router.use(acl.authorize);

//index
router.get("/",(req, res) => {
    res.render("index");
});

//signup
router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/signup", (req,res,next) => {
    var username = req.body.username;
    var password = req.body.password;
    var nombre = req.body.nombre;
    var a_paterno = req.body.a_paterno;
    var a_materno = req.body.a_materno;
    var correo = req.body.correo;
    var telefono = req.body.telefono;
    var role = req.body.role;

    Usuario.findOne({ username: username}, (err, usuario) => {
        if(err){
            return next(err);
        }
        if(usuario){
            req.flash("error", "Nom d'utilisateur non disponible");
            //res.redirect("/signup");
        }
        var newUsuario = new Usuario({
            username: username,
            password: password,
            nombre: nombre,
            a_paterno: a_paterno,
            a_materno: a_materno,
            correo: correo,
            telefono: telefono,
            role: role
        });
        newUsuario.save(next);
        res.redirect("/");
    });
});

//login
router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("login",{
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

//logout
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

//debutante I
router.get("/debutante-I",(req, res) => {
    res.render("debutante-I-examen");
});

router.post("/debutante-I", ensureAuthenticated,(req,res,next) => {
//basado en lo de perfil de las otras practicas para agregar sobre un mismo usuario.
    var A1 = req.body.A1.toLowerCase();
    var B1 = req.body.B1.toLowerCase();
    var C1 = req.body.C1.toLowerCase();
    var A2 = req.body.A2;
    var B2 = req.body.B2;
    var C2 = req.body.C2;
    var D2 = req.body.D2;
    var A3 = req.body.A3.toLowerCase();
    var B3 = req.body.B3.toLowerCase();
    var C3 = req.body.C3.toLowerCase();
    var D3 = req.body.D3.toLowerCase();
    var A41 = req.body.A41.toLowerCase();
    var A42 = req.body.A42.toLowerCase();
    var A43 = req.body.A43.toLowerCase();
    var B41 = req.body.B41.toLowerCase();
    var B42 = req.body.B42.toLowerCase();
    var B43 = req.body.B43.toLowerCase();
    var A5 = req.body.A5;
    var B5 = req.body.B5;
    var C5 = req.body.C5;
    var D5 = req.body.D5;
    var A6 = req.body.A6.toLowerCase();
    var B6 = req.body.B6.toLowerCase();
    var C6 = req.body.C6.toLowerCase();
    var D6 = req.body.D6.toLowerCase();
    var A7 = req.body.A7;
    var B7 = req.body.B7;
    var C7 = req.body.C7;
    var D7 = req.body.D7;
    var A8 = req.body.A8;
    var B8 = req.body.B8;
    var C8 = req.body.C8;
    var A9 = req.body.A9;
    var B9 = req.body.B9;
    var C9 = req.body.C9;
    var deb1 = 0;
    if(A1 === "mangent"){
        deb1++;
    }
    if(B1 === "vous appelez"){
        deb1++;
    }
    if(C1 === "chante"){
        deb1++;
    }
    if(A2 === "suis"){
        deb1++;
    }
    if(B2 === "a"){
        deb1++;
    }
    if(C2 === "sommes"){
        deb1++;
    }
    if(D2 === "ont"){
        deb1++;
    }
    if(A3 === "anglais"){
        deb1++;
    }
    if(B3 === "mexicaine"){
        deb1++;
    }
    if(C3 === "espagnol"){
        deb1++;
    }
    if(D3 === "américaine"){
        deb1++;
    }
    if(A41 ==="quarante-neuf"){
        deb1++;
    }
    if(A42 === "dix"){
        deb1++;
    }
    if(A43 === "cinquante-neuf"){
        deb1++;
    }
    if(B41 === "quatre-vingt-huit"){
        deb1++;
    }
    if(B42 === "cent cinq"){
        deb1++;
    }
    if(B43 === "cent quatre-vingt-treize"){
        deb1++;
    }
    if(A5 ==="en"){
        deb1++;
    }
    if(B5 === "au"){
        deb1++;
    }
    if(C5 === "à"){
        deb1++;
    }
    if(D5 === "aux"){
        deb1++;
    }
    if(A6 === "votre"){
        deb1++;
    }
    if(B6 === "ton"){
        deb1++;
    }
    if(C6 === "notre"){
        deb1++;
    }
    if(D6 === "son"){
        deb1++;
    }
    if(A7 === "la"){
        deb1++;
    }
    if(B7 === "des"){
        deb1++;
    }
    if(C7 === "un"){
        deb1++;
    }
    if(D7 === "une"){
        deb1++;
    }
    if(A8 === "à côte dû"){
        deb1++;
    }
    if(B8 === "à droite"){
        deb1++;
    }
    if(C8 === "entre"){
        deb1++;
    }
    if(A9 === "vos"){
        deb1++;
    }
    if(B9 === "leur"){
        deb1++;
    }
    if(C9 === "notre"){
        deb1++;
    }
    console.log(deb1);
    req.usuario.deb1 = deb1;
    if(deb1 < 24){
        req.usuario.deb1 = "Debutante I: Entre Nous 1 et 2";
    }
    req.usuario.save((err) => {
        if(err){
            next(err);
            return;
        }
        res.redirect("/debutante-I-resultado");
    });
});

//debutante I resultado
router.get("/debutante-I-resultado", (req, res) => {
    res.render("debutante-I-resultado");
});
    

//listado de estudiantes
router.get("/etudiantes", (req, res, next) =>{
    Usuario.find()
        .sort({ dateRegistrement: "descending"})
        .exec((err, usuarios) => {
            if(err){
                return next(err);
            }
            res.render("etudiantes", {usuarios: usuarios});
        });
});

//acceder al perfil del alumno
router.get("/etudiantes/:username",(req, res,next) =>{
    Usuario.findOne( {username: req.params.username },(err,usuario) => {
        if(err){
            return next(err);
        }
        res.render("profile",{ usuario:usuario });
    });
});

//acceder a examen a través del menú
router.get("/inicio-examen",(req, res) => {
    res.render("examen");
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else{
        req.flash("info", "Necesitas iniciar sesión para poder ver esta sección");
        res.redirect("/");
    }
}

module.exports = router;