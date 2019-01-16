var express = require("express");
var Usuario = require("./models/usuarios");

var passport = require("passport");
var acl = require("express-acl");
var PDF = require("pdfkit");
var fs = require("fs");

var doc = new PDF();
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
//          EXAMENES            //
//------------------------------//

//DEBUTANTE I
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
        req.usuario.resultado = "Débutante I: Entre Nous I (1, 2 et 3).";
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
    }
    if(B1 === "prends"){
        deb2++;
    }
    if(C1 === "vas"){
        deb2++;
    }
    if(A2 === "cet"){
        deb2++;
    }
    if(B2 === "cette"){
        deb2++;
    }
    if(C2 === "ces"){
        deb2++;
    }
    if(D2 === "ce"){
        deb2++;
    }
    if(A3 === "fais"){
        deb2++;
    }
    if(B3 === "te réveilles"){
        deb2++;
    }
    if(C3 === "se couche"){
        deb2++;
    }
    if(D3 === "écrivons"){
        deb2++;
    }
    if(E3 === "venez"){
        deb2++;
    }
    if(F3 === "savent"){
        deb2++;
    }
    if(A41 === "au"){
        deb2++;
    }
    if(A42 === "à la"){
        deb2++;
    }
    if(A43 === "à l'"){
        deb2++;
    }
    if(B41 === "du"){
        deb2++;
    }
    if(B42 === "de la"){
        deb2++;
    }
    if(B43 === "de l'"){
        deb2++;
    }
    if(A5 === "belle"){
        deb2++;
    }
    if(B5 === "cultivée"){
        deb2++;
    }
    if(C5 === "généreuse"){
        deb2++;
    }
    if(A6 === "B"){
        deb2++;
    }
    if(B6 === "B"){
        deb2++;
    }
    if(A71 === "suis"){
        deb2++;
    }
    if(A72 === "ai"){
        deb2++;
    }
    if(B71 === "ai"){
        deb2++;
    }
    if(B72 === "ai"){
        deb2++;
    }
    if(A8 === "vécu" || "vecu"){
        deb2++;
    }
    if(B8 === "pris"){
        deb2++;
    }
    if(C8 === "étudié"){
        deb2++;
    }
    if(D8 === "fait"){
        deb2++;
    }
    if(A9 === "je ne suis pas partie"){
        deb2++;
    }
    if(B9 === "nous n'avons pas couru"){
        deb2++;
    }
    if(A10 === "A"){
        deb2++;
    }
    if(B10 === "C"){
        deb2++;
    }
    if(C10 === "D"){
        deb2++;
    }
    if(D10 === "B"){
        deb2++;
    }
    if(A11 === "blonde"){
        deb2++;
    }
    if(A12 === "B"){
        deb2++;
    }
    if(B12 === "A"){
        deb2++;
    }
    if(C12 === "A"){
        deb2++;
    }
    if(D12 === "B"){
        deb2++;
    }
    if(E12 === "A"){
        deb2++;
    }
    if(A13 === "qui"){
        deb2++;
    }
    if(B13 === "que"){
        deb2++;
    }
    if(A14 === "il y a"){
        deb2++;
    }
    if(B14 === "depuis"){
        deb2++;
    }
    if(A15 === "A"){
        deb2++;
    }
    if(B15 === "C"){
        deb2++;
    }
    console.log(deb2);
    req.usuario.deb2 = deb2;
    if(deb2 < 35){
        req.usuario.resultado = "Débutante II: Entre Nous I (4, 5 et 6).";
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
        req.usuario.resultado = "Débutante III: Entre Nous I (7 et 8).";
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

router.post("/intermedio-I",ensureAuthenticated,(req,res,next) => {
    var A1 = req.body.A1.toLowerCase();
    var B1 = req.body.B1.toLowerCase();
    var C1 = req.body.C1.toLowerCase();
    var A2 = req.body.A2.toLowerCase();
    var B2 = req.body.B2.toLowerCase();
    var A3 = req.body.A3;
    var B3 = req.body.B3;
    var C3 = req.body.C3;
    var A4 = req.body.A4.toLowerCase();
    var B4 = req.body.B4.toLowerCase();
    var C4 = req.body.C4.toLowerCase();
    var D4 = req.body.D4.toLowerCase();
    var A5 = req.body.A5;
    var B5 = req.body.B5;
    var C5 = req.body.C5;
    var D5 = req.body.D5;
    var A6 = req.body.A6;
    var B6 = req.body.B6;
    var C6 = req.body.C6;
    var A7 = req.body.A7;
    var B7 = req.body.B7;
    var A8 = req.body.A8;
    var B8 = req.body.B8;
    var int1 = 0;
    if(A1 === "j'y vais"){
        int1++;
    }
    if(B1 === "nous y allons"){
        int1++;
    }
    if(C1 === "je n'y pars pas"){
        int1++;
    }
    if(A2 === "leur"){
        int1++;
    }
    if(B2 === "lui"){
        int1++;
    }
    if(A3 === "plus"){
        int1++;
    }
    if(B3 === "encore"){
        int1++;
    }
    if(C3 === "pas"){
        int1++;
    }
    if(A4 === "étais"){
        int1++;
    }
    if(B4 === "allais"){
        int1++;
    }
    if(C4 === "dormais"){
        int1++;
    }
    if(D4 === "partions"){
        int1++;
    }
    if(A5 === "meilleure"){
        int1++;
    }
    if(B5 === "mieux"){
        int1++;
    }
    if(C5 === "plus de"){
        int1++;
    }
    if(D5 === "moins de"){
        int1++;
    }
    if(A6 === "leur"){
        int1++;
    }
    if(B6 === "les"){
        int1++;
    }
    if(C6 === "me"){
        int1++;
    }
    if(A7 === "A"){
        int1++;
    }
    if(B7 === "B"){
        int1++;
    }
    if(A8 === "la plupart"){
        int1++;
    }
    if(B8 === "quelques-uns"){
        int1++;
    }
    console.log(int1);
    req.usuario.inter1 = int1;
    if(int1 < 16){
        req.usuario.resultado = "Intermédiaire I: Entre Nous II (1, 2 et 3).";
    }
    req.usuario.save((err) => {
        if(err){
            next(err);
            return;
        }
        res.redirect("/intermedio-I-resultado");
    });

});

// resultado INTERMEDIO I
router.get("/intermedio-I-resultado",(req,res) => {
    res.render("intermedio-I-resultado");
});

//intermedio II
router.get("/intermedio-II",(req, res) => {
    res.render("intermedio-II-examen");
});

router.post("/intermedio-II",ensureAuthenticated,(req,res,next) => {
    var A1 = req.body.A1.toLowerCase();
    var B1 = req.body.B1.toLowerCase();
    var C1 = req.body.C1.toLowerCase();
    var D1 = req.body.D1.toLowerCase();
    var E1 = req.body.E1.toLowerCase();
    var F1 = req.body.F1.toLowerCase();
    var G1 = req.body.G1.toLowerCase();
    var A2 = req.body.A2;
    var A3 = req.body.A3;
    var B3 = req.body.B3;
    var C3 = req.body.C3;
    var D3 = req.body.D3;
    var E3 = req.body.E3;
    var A4 = req.body.A4;
    var B4 = req.body.B4;
    var A5 = req.body.A5.toLowerCase();
    var B5 = req.body.B5.toLowerCase();
    var A6 = req.body.A6;
    var B6 = req.body.B6;
    var A7 = req.body.A7.toLowerCase();
    var B7 = req.body.B7.toLowerCase();
    var inter2 = 0;
    if(A1 === "sera"){
        inter2++;
    }
    if(B1 === "aura"){
        inter2++;
    }
    if(C1 === "diminuera"){
        inter2++;
    }
    if(D1 === "seront"){
        inter2++;
    }
    if(E1 === "habiteront"){
        inter2++;
    }
    if(F1 === "adopteront"){
        inter2++;
    }
    if(G1 === "pourront"){
        inter2++;
    }
    if(A2 === "que"){
        inter2++;
    }
    if(A3 === "étais"){
        inter2++;
    }
    if(B3 === "allais"){
        inter2++;
    }
    if(C3 === "suis tombe"){
        inter2++;
    }
    if(D3 === "ai pleure"){
        inter2++;
    }
    if(E3 === "a achete"){
        inter2++;
    }
    if(A4 === "autrefois"){
        inter2++;
    }
    if(B4 === "de nous jours"){
        inter2++;
    }
    if(A5 === "seras"){
        inter2++;
    }
    if(B5 === "mange"){
        inter2++;
    }
    if(A6 === "sûrement"){
        inter2++;
    }
    if(B6 === "sans doute"){
        inter2++;
    }
    if(A7 === "à la"){
        inter2++;
    }
    if(B7 === "aux"){
        inter2++;
    }
    console.log(inter2);
    req.usuario.inter2 = inter2;
    if(inter2 < 14){
        req.usuario.resultado = "Intermédiaire I: Entre Nous II (4, 5 et 6).";
    }
    req.usuario.save((err) => {
        if(err){
            next(err);
            return;
        }
        res.redirect("/intermedio-II-resultado");
    });
});

router.get("/intermedio-II-resultado",(req,res)=>{
    res.render("intermedio-II-resultado");
});


// intermedio III
router.get("/intermedio-III",(req,res)=>{
    res.render("intermedio-III-examen");
});

router.post("/intermedio-III",ensureAuthenticated,(req,res,next) => {
    var A1 = req.body.A1.toLowerCase();
    var B1 = req.body.B1.toLowerCase();
    var C1 = req.body.C1.toLowerCase();
    var A2 = req.body.A2;
    var B2 = req.body.B2;
    var A3 = req.body.A3;
    var B3 = req.body.B3;
    var C3 = req.body.C3;
    var D3 = req.body.D3;
    var A4 = req.body.A4.toLowerCase();
    var B4 = req.body.B4.toLowerCase();
    var A5 = req.body.A5.toLowerCase();
    var B5 = req.body.B5.toLowerCase();
    var A6 = req.body.A6;
    var B6 = req.body.B6;
    var A7 = req.body.A7;
    var B7 = req.body.B7;
    var int3 = 0;
    if(A1 === "il ne faut pas fumer"){
        int3++;
    }
    if(B1 === "tu ne dois pas entrer"){
        int3++;
    }
    if(C1 === "vous devez respecter l'espace"){
        int3++;
    }
    if(A2 === "celle-ci"){
        int3++;
    }
    if(B2 === "ceux-ci"){
        int3++;
    }
    if(A3 === "repas"){
        int3++;
    }
    if(B3 === "A"){
        int3++;
    }
    if(C3 === "semestriel"){
        int3++;
    }
    if(D3 === "B"){
        int3++;
    }
    if(A4 === "agréablement"){
        int3++;
    }
    if(B4 === "évidemment"){
        int3++;
    }
    if(A5 === "penserais"){
        int3++;
    }
    if(B5 === "pourrait"){
        int3++;
    }
    if(A6 === "B"){
        int3++;
    }
    if(B6 === "B"){
        int3++;
    }
    if(A7 === "B"){
        int3++;
    }
    if(B7 === "A"){
        int3++;
    }
    console.log(int3);
    req.usuario.inter3 = int3;
    if(int3 < 11){
        req.usuario.resultado = "Intermédiaire I: Entre Nous II (7 et 8).";
    }
    req.usuario.save((err) => {
        if(err){
            next(err);
            return;
        }
        res.redirect("/intermedio-III-resultado");
    });
});

router.get("/intermedio-III-resultado",(req,res)=>{
    res.render("intermedio-III-resultado");
});

//Avanzados GET
router.get("/avanzado-I", (req, res, next) => {
    res.render("avanzado-I-examen");
});

router.post("/avanzado-II", (req, res, next) => {
    var A1 = req.body.A1;
    var B1 = req.body.B1;
    var A2 = req.body.A2;
    var B2 = req.body.B2;
    var A3 = req.body.A3.toLowerCase();
    var B3 = req.body.B3.toLowerCase();
    var A4 = req.body.A4.toLowerCase();
    var B4 = req.body.B4.toLowerCase();
    var A5 = req.body.A5;
    var B5 = req.body.B5;
    var A6 = req.body.A6.toLowerCase();
    var B6 = req.body.B6.toLowerCase();
    var C6 = req.body.C6.toLowerCase();
    var A7 = req.body.A7;
    var avanc1 = 0;
    //TODO evaluar cada valor
    console.log(avanc1);
    req.usuario.avanc1 = avanc1;
    if(avanc1 < 9){
        req.usuario.resultado = "Avancé I: Entre Nous III (1, 2 et 3).";
    }
    req.usuario.save((err) => {
        if(err){
            next(err);
            return;
        }
        res.redirect("/avanzado-I-resultado");
    });
});

router.get("/avanzado-II", (req, res, next) => {
    res.render("avanzado-II-examen");
});

router.get("/avanzado-III", (req, res, next) => {
    res.render("avanzado-III-examen");
});

router.get("/avanzado-I-resultado",(req, res, next) => {
    res.render("avanzado-I-resultado");
});

router.get("/avanzado-II-resultado", (req, res, next) => {
    res.render("avanzado-II-resultado");
});

router.get("/avanzado-III-resultado", (req, res, next) => {
    res.render("avanzado-III-resultado");
});

router.get("/perf-I", (req, res, next) => {
    res.render("perf-I-examen");
});

router.get("/perf-II", (req, res, next) => {
    res.render("perf-II-examen");
});

router.get("/perf-IV", (req, res, next) => {
    res.render("perf-IV-examen");
});

router.get("/perf-III", (req, res, next) => {
    res.render("perf-III-examen");
});

router.get("/perf-I-resultado", (req, res, next) => {
    res.render("perf-I-resultado");
});

router.get("/perf-II-resultado", (req, res, next) => {
    res.render("perf-II-resultado");
});

router.get("/perf-III-resultado", (req, res, next) => {
    res.render("perf-III-resultado");
});

router.get("/perf-IV-resultado", (req, res, next) => {
    res.render("perf-IV-resultado");
});

//---------------------------------------//
//           PDF - LISTADO               //
//---------------------------------------//
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

//sacar PDF del perfil
router.post("/etudiantes/:username", (req, res, next) => {

    var nombre = req.body.nombre;
    var correo = req.body.correo;
    var resultado = req.body.resultado;
    var telefono = req.body.telefono;
    var usuario = req.body.usuario;
    //console.log(usuario);
    //console.log(nombre);
    doc.pipe(fs.createWriteStream(__dirname + '/PDF/' + usuario + '-resultado' +'.pdf'));    
    doc.image('public/pdf-logo.jpg', 0, 0)
        .fontSize(24)
        .font('public/fonts/ariali.ttf')
        .text('¡Félicitations!', 50, 230);

    doc.fontSize(16)
       .font('public/fonts/ariali.ttf')
       .text(nombre, 50, 300);

    doc.fontSize(12)
        .font('public/fonts/verdana.ttf')
        .text('Correo electrónico: ' + correo, 50, 325)
        .text('Télefono: ' + telefono, 50, 340)
        .text('A través del presente documento, nos alegra comunicarle sus resultados en el examen de ubicación de la lengua francesa en nuestra institución.', 50, 255)
        .text('A continuación damos a conocer los resultados del alumno/a:', 50, 285);
    
    doc.fontSize(18)
        .font('public/fonts/ariali.ttf')
        .text(resultado, 150, 370);
    
    doc.end();
    
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