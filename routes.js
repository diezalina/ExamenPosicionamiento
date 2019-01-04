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

//------------------------------//
//              login           //
//------------------------------//
router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("login",{
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

//------------------------------//
//          logout              //
//------------------------------//
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});
//------------------------------//
//          debutante I         //
//------------------------------//
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
        req.usuario.resultado = "Debutante I: Entre Nous 1, 2 et 3.";
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


//debutante II examen
router.get("/debutante-II",(req,res) => {
    res.render("debutante-II-examen");
});

router.post("/debutante-II", ensureAuthenticated,(req, res) => {
    var A1 = req.body.A1.toLowerCase();
    var B1 = req.body.B1.toLowerCase();
    var C1 = req.body.C1.toLowerCase();
    var A2 = req.body.A2.toLowerCase();
    var B2 = req.body.B2.toLowerCase();
    var C2 = req.body.C2.toLowerCase();
    var D2 = req.body.D2.toLowerCase();
    var A3 = req.body.A3.toLowerCase();
    var B3 = req.body.B3.toLowerCase();
    var C3 = req.body.C3.toLowerCase();
    var D3 = req.body.D3.toLowerCase();
    var E3 = req.body.E3.toLowerCase();
    var F3 = req.body.F3.toLowerCase();
    var A41 = req.body.A41;
    var A42 = req.body.A42;
    var A43 = req.body.A43;
    var B41 = req.body.B41;
    var B42 = req.body.B42;
    var B43 = req.body.B43;
    var A5 = req.body.A5;
    var B5 = req.body.B5;
    var C5 = req.body.C5;
    var A6 = req.body.A6;
    var B6 = req.body.B6;
    var A71 = req.body.A71;
    var A72 = req.body.A72;
    var B71 = req.body.B71;
    var B72 = req.body.B72;
    var A8 = req.body.A8.toLowerCase();
    var B8 = req.body.B8.toLowerCase();
    var C8 = req.body.C8.toLowerCase();
    var D8 = req.body.D8.toLowerCase();
    var A9 = req.body.A9.toLowerCase();
    var B9 = req.body.B9.toLowerCase();
    var A10 = req.body.A10;
    var B10 = req.body.B10;
    var C10 = req.body.C10;
    var D10 = req.body.D10;
    var A11 = req.body.A11;
    var A12 = req.body.A12;
    var B12 = req.body.B12;
    var C12 = req.body.C12;
    var D12 = req.body.D12;
    var E12 = req.body.E12;
    var A13 = req.body.A13;
    var B13 = req.body.B13;
    var A14 = req.body.A14;
    var B14 = req.body.B14;
    var A15 = req.body.A15;
    var B15 = req.body.B15;
    var deb2 = 0;
    if(A1 === "descends"){
        deb2++;
        console.log("A1");
    }
    if(B1 === "prends"){
        deb2++;
        console.log("B1");
    }
    if(C1 === "vas"){
        deb2++;
        console.log("C1");
    }
    if(A2 === "cet"){
        deb2++;
        console.log("A2");
    }
    if(B2 === "cette"){
        deb2++;
        console.log("B2");
    }
    if(C2 === "ces"){
        deb2++;
        console.log("C2");
    }
    if(D2 === "ce"){
        deb2++;
        console.log("D2");
    }
    if(A3 === "fais"){
        deb2++;
        console.log("A3");
    }
    if(B3 === "te réveilles"){
        deb2++;
        console.log("B3");
    }
    if(C3 === "se couche"){
        deb2++;
        console.log("C3");
    }
    if(D3 === "écrivons"){
        deb2++;
        console.log("D3");
    }
    if(E3 === "venez"){
        deb2++;
        console.log("E3");
    }
    if(F3 === "savent"){
        deb2++;
        console.log("F3");
    }
    if(A41 === "au"){
        deb2++;
        console.log("A41");
    }
    if(A42 === "à la"){
        deb2++;
        console.log("A42");
    }
    if(A43 === "à l'"){
        deb2++;
        console.log("A43");
    }
    if(B41 === "du"){
        deb2++;
        console.log("B41");
    }
    if(B42 === "de la"){
        deb2++;
        console.log("b42");
    }
    if(B43 === "de l'"){
        deb2++;
        console.log("b43");
    }
    if(A5 === "belle"){
        deb2++;
        console.log("a5");
    }
    if(B5 === "cultivée"){
        deb2++;
        console.log("b5");
    }
    if(C5 === "généreuse"){
        deb2++;
        console.log("c5");
    }
    if(A6 === "B"){
        deb2++;
        console.log("a6");
    }
    if(B6 === "B"){
        deb2++;
        console.log("b6");
    }
    if(A71 === "suis"){
        deb2++;
        console.log("a71");
    }
    if(A72 === "ai"){
        deb2++;
        console.log("a72");
    }
    if(B71 === "ai"){
        deb2++;
        console.log("b71");
    }
    if(B72 === "ai"){
        deb2++;
        console.log("b72");
    }
    if(A8 === "vécu" || "vecu"){
        deb2++;
        console.log("a8");
    }
    if(B8 === "pris"){
        deb2++;
        console.log("b8");
    }
    if(C8 === "étudié"){
        deb2++;
        console.log("c8");
    }
    if(D8 === "fait"){
        deb2++;
        console.log("d8");
    }
    if(A9 === "je ne suis pas partie"){
        deb2++;
        console.log("a9");
    }
    if(B9 === "nous n'avons pas couru"){
        deb2++;
        console.log("b9");
    }
    if(A10 === "A"){
        deb2++;
        console.log("a10");
    }
    if(B10 === "C"){
        deb2++;
        console.log("b10");
    }
    if(C10 === "D"){
        deb2++;
        console.log("c10");
    }
    if(D10 === "B"){
        deb2++;
        console.log("d10");
    }
    if(A11 === "blonde"){
        deb2++;
        console.log("a11");
    }
    if(A12 === "B"){
        deb2++;
        console.log("a12");
    }
    if(B12 === "A"){
        deb2++;
        console.log("b12");
    }
    if(C12 === "A"){
        deb2++;
        console.log("c12");
    }
    if(D12 === "B"){
        deb2++;
        console.log("D12");
    }
    if(E12 === "A"){
        deb2++;
        console.log("e12");
    }
    if(A13 === "qui"){
        deb2++;
        console.log("a13");
    }
    if(B13 === "que"){
        deb2++;
        console.log("b13");
    }
    if(A14 === "il y a"){
        deb2++;
        console.log("a14");
    }
    if(B14 === "depuis"){
        deb2++;
        console.log("b14");
    }
    if(A15 === "A"){
        deb2++;
        console.log("a15");
    }
    if(B15 === "C"){
        deb2++;
        console.log("b15");
    }
    console.log(deb2);
    req.usuario.deb2 = deb2;
    if(deb2 < 35){
        req.usuario.resultado = "Debutante II: Entre Nous 4, 5 et 6.";
    }
    req.usuario.save((err) => {
        if(err){
            next(err);
            return;
        }
        res.redirect("/debutante-II-resultado");
    });
});

//debutante II resultado
router.get("/debutante-II-resultado",(req,res) => {
    res.render("debutante-II-resultado");
});

//--------------------------------//
//            DEB 3               //
//--------------------------------//
router.get("/debutante-III",(req, res) => {
    res.render("debutante-III-examen");
});

router.post("/debutante-III",ensureAuthenticated,(req,res,next) => {
    var A1 = req.body.A1;
    var B1 = req.body.B1;
    var C1 = req.body.C1;
    var D1 = req.body.D1;
    var A2 = req.body.A2;
    var B2 = req.body.B2;
    var C2 = req.body.C2;
    var D2 = req.body.D2;
    var A3 = req.body.A3;
    var B3 = req.body.B3;
    var A4 = req.body.A4.toLowerCase();
    var B4 = req.body.B4.toLowerCase();
    var C4 = req.body.C4.toLowerCase();
    var D4 = req.body.D4.toLowerCase();
    var E4 = req.body.E4.toLowerCase();
    var F4 = req.body.F4;
    var G4 = req.body.G4;
    var H4 = req.body.H4;
    var I4 = req.body.I4;
    var A5 = req.body.A5;
    var B5 = req.body.B5;
    var C5 = req.body.C5;
    var A6 = Boolean(req.body.A6);
    var B6 = Boolean(req.body.B6);
    var C6 = Boolean(req.body.C6);
    var A7 = req.body.A7;
    var B7 = req.body.B7;
    var C7 = req.body.C7;
    var D7 = req.body.D7;
    var A8 = req.body.A8.toLowerCase();
    var B8 = req.body.B8.toLowerCase();
    var C8 = req.body.C8.toLowerCase();
    var A9 = req.body.A9;
    var B9 = req.body.B9;
    var A10 = req.body.A10.toLowerCase();
    var B10 = req.body.B10.toLowerCase();
    var A11 = req.body.A11.toLowerCase();
    var deb3 = 0;
    if( A1 === "le pied"){
        deb3++;
    }
    if(B1 === "le bras"){
        deb3++;
    }
    if(C1 === "les dents"){
        deb3++;
    }
    if(D1 === "la main"){
        deb3++;
    }
    if(A2 === "D"){
        deb3++;
    }
    if(B2 === "C"){
        deb3++;
    }
    if(C2 === "B"){
        deb3++;
    }
    if(D2 === "A"){
        deb3++;
    }
    if(A3 === "les gens"){
        deb3++;
    }
    if(B3 === "nous"){
        deb3++;
    }
    if(A4 === "des"){
        deb3++;
    }
    if(B4 === "du"){
        deb3++;
    }
    if(C4 === "de la"){
        deb3++;
    }
    if(D4 === "de"){
        deb3++;
    }
    if(E4 === "de"){
        deb3++;
    }
    if(F4 === "du"){
        deb3++;
    }
    if(G4 === "de la"){
        deb3++;
    }
    if(H4 === "du"){
        deb3++;
    }
    if(I4 === "des"){
        deb3++;
    }
    if(A5 === "les"){
        deb3++;
    }
    if(B5 === "l'"){
        deb3++;
    }
    if(C5 === "la"){
        deb3++;
    }
    if(A6 === true){
        deb3++;
    }
    if(B6 === true){
        deb3++;
    }
    if(C6 === true){
        deb3++;
    }
    if(A7 === "des"){
        deb3++;
    }
    if(B7 === "des"){
        deb3++;
    }
    if(C7 === "une"){
        deb3++;
    }
    if(D7 === "chez"){
        deb3++;
    }
    if(A8 === "devez"){
        deb3++;
    }
    if(B8 === "pouvons"){
        deb3++;
    }
    if(C8 === "veux"){
        deb3++;
    }
    if(A9 === "blanche"){
        deb3++;
    }
    if(B9 === "bleus"){
        deb3++;
    }
    if(A10 === "mets"){
        deb3++;
    }
    if(B10 === "écoutez"){
        deb3++;
    }
    if(A11 === "je vais acheter une robe"){
        deb3++;
    }
    console.log(deb3);
    req.usuario.deb3 = deb3;
    if(deb3 < 26){
        req.usuario.resultado = "Debutante III: Entre Nous 7 et 8.";
    }
    req.usuario.save((err) => {
        if(err){
            next(err);
            return;
        }
        res.redirect("/debutante-III-resultado");
    });

});

//Resultados deb III
router.get("/debutante-III-resultado",(req, res) => {
    res.render("debutante-III-resultado");
});

//Int I
router.get("/intermedio-I",(req,res) => {
    res.render("intermedio-I-examen");
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