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
    res.render("debutante-I-Examen");
});

router.post("/debutante-I", ensureAuthenticated,(req,res,next) => {
//basado en lo de perfil de las otras practicas para agregar sobre un mismo usuario.
    var B1 = req.body.B1.toLowerCase();
    var C1 = req.body.C1.toLowerCase();
    var B2 = req.body.B2;
    var C2 = req.body.C2;
    var A3 = req.body.A3.toLowerCase();
    var B3 = req.body.B3.toLowerCase();
    var A41 = req.body.A41.toLowerCase();
    var A42 = req.body.A42.toLowerCase();
    var A43 = req.body.A43.toLowerCase();
    var A5 = req.body.A5;
    var B5 = req.body.B5;
    var C5 = req.body.C5;
    var D5 = req.body.D5;
    var A8 = req.body.A8;
    var B8 = req.body.B8;
    var A9 = req.body.A9;
    var C9 = req.body.C9;
    var deb1 = 0;
    if(B1 === "vous appelez"){
        deb1++;
    }
    if(C1 === "chante"){
        deb1++;
    }
    if(B2 === "a"){
        deb1++;
    }
    if(C2 === "sommes"){
        deb1++;
    }
    if(A3 === "anglais"){
        deb1++;
    }
    if(B3 === "mexicaine"){
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
    if(A8 === "à côte du"){
        deb1++;
    }
    if(B8 === "à droite"){
        deb1++;
    }
    if(A9 === "vos"){
        deb1++;
    }
    if(C9 === "notre"){
        deb1++;
    }
    console.log(deb1);
    req.usuario.deb1 = deb1;
    if(deb1 < 12){
        req.usuario.resultado = "Débutante I: Entre Nous I (1, 2 et 3).";
        doc.pipe(fs.createWriteStream(__dirname + '/PDF/' + req.usuario.username + '-resultado' +'.pdf'));    
        doc.image('public/pdf-logo.jpg', 0, 0)
            .fontSize(24)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.nombre + ' '+ req.usuario.a_paterno + ' ' + req.usuario.a_materno, 50, 230);

        doc.fontSize(17)
            .font('public/fonts/ariali.ttf')
            .text('Les résultats', 50, 300);

        doc.fontSize(12)
            .font('public/fonts/verdana.ttf')
            .text('Correo electrónico: ' + req.usuario.correo, 50, 325)
            .text('Télefono: ' + req.usuario.telefono, 50, 340)
            .text('A continuación damos a conocer los resultados del alumno/a:', 50, 355)
            .text('Débutante I:' + req.usuario.deb1 + '/17', 50, 380);
        
        doc.fontSize(18)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.resultado, 75, 410);
        
        doc.end();
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
    res.render("debutante-I-Resultado");
});


//debutante II examen
router.get("/debutante-II",(req,res) => {
    res.render("debutante-II-examen");
});

router.post("/debutante-II", ensureAuthenticated,(req, res) => {
    var A2 = req.body.A2.toLowerCase();
    var B2 = req.body.B2.toLowerCase();
    var A3 = req.body.A3.toLowerCase();
    var B3 = req.body.B3.toLowerCase();
    var E3 = req.body.E3.toLowerCase();
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
    var A71 = req.body.A71;
    var A72 = req.body.A72;
    var A8 = req.body.A8.toLowerCase();
    var C8 = req.body.C8.toLowerCase();
    var D8 = req.body.D8.toLowerCase();
    var A9 = req.body.A9.toLowerCase();
    var C10 = req.body.C10;
    var D10 = req.body.D10;
    var A11 = req.body.A11;
    var A13 = req.body.A13;
    var B13 = req.body.B13;
    var A14 = req.body.A14;
    var B14 = req.body.B14;
    var A15 = req.body.A15;
    var B15 = req.body.B15;
    var deb2 = 0;
    if(A2 === "cet"){
        deb2++;
    }
    if(B2 === "cette"){
        deb2++;
    }
    if(A3 === "fais"){
        deb2++;
    }
    if(B3 === "te réveilles"){
        deb2++;
    }
    if(E3 === "venez"){
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
    if(A71 === "suis"){
        deb2++;
    }
    if(A72 === "ai"){
        deb2++;
    }
    if(A8 === "vécu" || "vecu"){
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
    if(C10 === "D"){
        deb2++;
    }
    if(D10 === "B"){
        deb2++;
    }
    if(A11 === "blonde"){
        deb2++;
    }
    if(A13 === "qui"){
        deb2++;
    }
    if(A14 === "il y a"){
        deb2++;
    }
    if(B15 === "C"){
        deb2++;
    }
    console.log(deb2);
    req.usuario.deb2 = deb2;
    if(deb2 < 19){
        req.usuario.resultado = "Débutante II: Entre Nous I (4, 5 et 6).";
        doc.pipe(fs.createWriteStream(__dirname + '/PDF/' + req.usuario.username + '-resultado' +'.pdf'));    
        doc.image('public/pdf-logo.jpg', 0, 0)
            .fontSize(24)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.nombre + ' '+ req.usuario.a_paterno + ' ' + req.usuario.a_materno, 50, 230);

        doc.fontSize(17)
            .font('public/fonts/ariali.ttf')
            .text('Les résultats', 50, 300);

        doc.fontSize(12)
            .font('public/fonts/verdana.ttf')
            .text('Correo electrónico: ' + req.usuario.correo, 50, 325)
            .text('Télefono: ' + req.usuario.telefono, 50, 340)
            .text('A continuación damos a conocer los resultados del alumno/a:', 50, 355)
            .text('Débutante I:' + req.usuario.deb1 + '/17', 50, 380)
            .text('Débutante II:' + req.usuario.deb2 + '/27', 50, 395);
        
        doc.fontSize(18)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.resultado, 75, 425);
        
        doc.end();
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
    var B1 = req.body.B1;
    var C1 = req.body.C1;
    var B2 = req.body.B2;
    var C2 = req.body.C2;
    var A3 = req.body.A3;
    var A4 = req.body.A4.toLowerCase();
    var B4 = req.body.B4.toLowerCase();
    var C4 = req.body.C4.toLowerCase();
    var D4 = req.body.D4.toLowerCase();
    var E4 = req.body.E4.toLowerCase();
    var A5 = req.body.A5;
    var B5 = req.body.B5;
    var A6 = Boolean(req.body.A6);
    var B6 = Boolean(req.body.B6);
    var C6 = Boolean(req.body.C6);
    var A8 = req.body.A8.toLowerCase();
    var B8 = req.body.B8.toLowerCase();
    var A9 = req.body.A9;
    var B10 = req.body.B10.toLowerCase();
    var A11 = req.body.A11.toLowerCase();
    var deb3 = 0;
    if(B1 === "le bras"){
        deb3++;
    }
    if(C1 === "la main"){
        deb3++;
    }
    if(B2 === "C"){
        deb3++;
    }
    if(C2 === "B"){
        deb3++;
    }
    if(A3 === "les gens"){
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
    if(A5 === "les"){
        deb3++;
    }
    if(B5 === "l'"){
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
    if(A8 === "devez"){
        deb3++;
    }
    if(B8 === "pouvons"){
        deb3++;
    }
    if(A9 === "blanche"){
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
    if(deb3 < 14){
        req.usuario.resultado = "Débutante III: Entre Nous I (7 et 8).";
        doc.pipe(fs.createWriteStream(__dirname + '/PDF/' + req.usuario.username + '-resultado' +'.pdf'));    
        doc.image('public/pdf-logo.jpg', 0, 0)
            .fontSize(24)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.nombre + ' '+ req.usuario.a_paterno + ' ' + req.usuario.a_materno, 50, 230);

        doc.fontSize(17)
            .font('public/fonts/ariali.ttf')
            .text('Les résultats', 50, 300);

        doc.fontSize(12)
            .font('public/fonts/verdana.ttf')
            .text('Correo electrónico: ' + req.usuario.correo, 50, 325)
            .text('Télefono: ' + req.usuario.telefono, 50, 340)
            .text('A continuación damos a conocer los resultados del alumno/a:', 50, 355)
            .text('Débutante I:' + req.usuario.deb1 + '/17', 50, 380)
            .text('Débutante II:' + req.usuario.deb2 + '/27', 50, 395)
            .text('Débutante III:' + req.usuario.deb3 + '/20', 50 , 410);
        
        doc.fontSize(18)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.resultado, 75, 440);
        
        doc.end();
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
    var A3 = req.body.A3;
    var B3 = req.body.B3;
    var A4 = req.body.A4.toLowerCase();
    var B4 = req.body.B4.toLowerCase();
    var A5 = req.body.A5;
    var B5 = req.body.B5;
    var A6 = req.body.A6;
    var B6 = req.body.B6;
    var C6 = req.body.C6;
    var A7 = req.body.A7;
    var A8 = req.body.A8;
    var int1 = 0;
    if(A1 === "j'y vais"){
        int1++;
    }
    if(A3 === "plus"){
        int1++;
    }
    if(B3 === "encore"){
        int1++;
    }
    if(A4 === "étais"){
        int1++;
    }
    if(B4 === "allais"){
        int1++;
    }
    if(A5 === "meilleure"){
        int1++;
    }
    if(B5 === "mieux"){
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
    if(A8 === "la plupart"){
        int1++;
    }
    console.log(int1);
    req.usuario.inter1 = int1;
    if(int1 < 8){
        req.usuario.resultado = "Intermédiaire I: Entre Nous II (1, 2 et 3).";
        doc.pipe(fs.createWriteStream(__dirname + '/PDF/' + req.usuario.username + '-resultado' +'.pdf'));    
        doc.image('public/pdf-logo.jpg', 0, 0)
            .fontSize(24)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.nombre + ' '+ req.usuario.a_paterno + ' ' + req.usuario.a_materno, 50, 230);

        doc.fontSize(17)
            .font('public/fonts/ariali.ttf')
            .text('Les résultats', 50, 300);

        doc.fontSize(12)
            .font('public/fonts/verdana.ttf')
            .text('Correo electrónico: ' + req.usuario.correo, 50, 325)
            .text('Télefono: ' + req.usuario.telefono, 50, 340)
            .text('A continuación damos a conocer los resultados del alumno/a:', 50, 355)
            .text('Débutante I:' + req.usuario.deb1 + '/17', 50, 380)
            .text('Débutante II:' + req.usuario.deb2 + '/27', 50, 395)
            .text('Débutante III:' + req.usuario.deb3 + '/20', 50 , 410)
            .text('Intermédiaire I:' + req.usuario.inter1 + '/12', 50, 425);
        
        doc.fontSize(18)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.resultado, 75, 455);
        
        doc.end();
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
    var A3 = req.body.A3;
    var B3 = req.body.B3;
    var C3 = req.body.C3;
    var D3 = req.body.D3;
    var E3 = req.body.E3;
    var B5 = req.body.B5.toLowerCase();
    var A6 = req.body.A6;
    var A7 = req.body.A7.toLowerCase();
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
    if(B5 === "mange"){
        inter2++;
    }
    if(A6 === "sûrement"){
        inter2++;
    }
    if(A7 === "à la"){
        inter2++;
    }
    console.log(inter2);
    req.usuario.inter2 = inter2;
    if(inter2 < 7){
        req.usuario.resultado = "Intermédiaire I: Entre Nous II (4, 5 et 6).";
        doc.pipe(fs.createWriteStream(__dirname + '/PDF/' + req.usuario.username + '-resultado' +'.pdf'));    
        doc.image('public/pdf-logo.jpg', 0, 0)
            .fontSize(24)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.nombre + ' '+ req.usuario.a_paterno + ' ' + req.usuario.a_materno, 50, 230);

        doc.fontSize(17)
            .font('public/fonts/ariali.ttf')
            .text('Les résultats', 50, 300);

        doc.fontSize(12)
            .font('public/fonts/verdana.ttf')
            .text('Correo electrónico: ' + req.usuario.correo, 50, 325)
            .text('Télefono: ' + req.usuario.telefono, 50, 340)
            .text('A continuación damos a conocer los resultados del alumno/a:', 50, 355)
            .text('Débutante I:' + req.usuario.deb1 + '/17', 50, 380)
            .text('Débutante II:' + req.usuario.deb2 + '/27', 50, 395)
            .text('Débutante III:' + req.usuario.deb3 + '/20', 50 , 410)
            .text('Intermédiaire I:' + req.usuario.inter1 + '/12', 50, 425)
            .text('Intermédiaire II:' + req.usuario.inter2 + '/11', 50, 440);
        
        doc.fontSize(18)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.resultado, 75, 470);
        
        doc.end();
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
    var C1 = req.body.C1.toLowerCase();
    var A2 = req.body.A2;
    var A4 = req.body.A4.toLowerCase();
    var B4 = req.body.B4.toLowerCase();
    var A5 = req.body.A5.toLowerCase();
    var B5 = req.body.B5.toLowerCase();
    var A6 = req.body.A6;
    var A7 = req.body.A7;
    var int3 = 0;
    if(A1 === "il ne faut pas fumer"){
        int3++;
    }
    if(C1 === "vous devez respecter l'espace"){
        int3++;
    }
    if(A2 === "celle-ci"){
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
    if(A7 === "B"){
        int3++;
    }
    console.log(int3);
    req.usuario.inter3 = int3;
    if(int3 < 6){
        req.usuario.resultado = "Intermédiaire I: Entre Nous II (7 et 8).";
        doc.pipe(fs.createWriteStream(__dirname + '/PDF/' + req.usuario.username + '-resultado' +'.pdf'));    
        doc.image('public/pdf-logo.jpg', 0, 0)
            .fontSize(24)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.nombre + ' '+ req.usuario.a_paterno + ' ' + req.usuario.a_materno, 50, 230);

        doc.fontSize(17)
            .font('public/fonts/ariali.ttf')
            .text('Les résultats', 50, 300);

        doc.fontSize(12)
            .font('public/fonts/verdana.ttf')
            .text('Correo electrónico: ' + req.usuario.correo, 50, 325)
            .text('Télefono: ' + req.usuario.telefono, 50, 340)
            .text('A continuación damos a conocer los resultados del alumno/a:', 50, 355)
            .text('Débutante I:' + req.usuario.deb1 + '/17', 50, 380)
            .text('Débutante II:' + req.usuario.deb2 + '/27', 50, 395)
            .text('Débutante III:' + req.usuario.deb3 + '/20', 50 , 410)
            .text('Intermédiaire I:' + req.usuario.inter1 + '/12', 50, 425)
            .text('Intermédiaire II:' + req.usuario.inter2 + '/11', 50, 440)
            .text('Intermédiaire III:' + req.usuario.inter3 + '/9', 50, 455);
        
        doc.fontSize(18)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.resultado, 75, 485);
        
        doc.end();
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
    res.render("avanzado-I-Examen");
});

router.post("/avanzado-I", (req, res, next) => {
    var B1 = req.body.B1;
    var A2 = req.body.A2;
    var A3 = req.body.A3.toLowerCase();
    var A4 = req.body.A4.toLowerCase();
    var B5 = req.body.B5;
    var A6 = req.body.A6.toLowerCase();
    var C6 = req.body.C6.toLowerCase();
    var avanc1 = 0;
    //TODO evaluar cada valor
    if(B1 === "le sien"){
        avanc1++;
    }
    if(A2 === "prise"){
        avanc1++;
    }
    if(A3 === "en chantant"){
        avanc1++;
    }
    if(A4 === "avais fait"){
        avanc1++;
    }
    if(B5 === "etant"){
        avanc1++;
    }
    if(A6 === "choisirais"){
        avanc1++;
    }
    if(C6 === "devras"){
        avanc1++;
    }
    console.log(avanc1);
    req.usuario.avanc1 = avanc1;
    if(avanc1 < 5){
        req.usuario.resultado = "Avancé I: Entre Nous III (1, 2 et 3).";
        doc.pipe(fs.createWriteStream(__dirname + '/PDF/' + req.usuario.username + '-resultado' +'.pdf'));    
        doc.image('public/pdf-logo.jpg', 0, 0)
            .fontSize(24)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.nombre + ' '+ req.usuario.a_paterno + ' ' + req.usuario.a_materno, 50, 230);

        doc.fontSize(17)
            .font('public/fonts/ariali.ttf')
            .text('Les résultats', 50, 300);

        doc.fontSize(12)
            .font('public/fonts/verdana.ttf')
            .text('Correo electrónico: ' + req.usuario.correo, 50, 325)
            .text('Télefono: ' + req.usuario.telefono, 50, 340)
            .text('A continuación damos a conocer los resultados del alumno/a:', 50, 355)
            .text('Débutante I:' + req.usuario.deb1 + '/17', 50, 380)
            .text('Débutante II:' + req.usuario.deb2 + '/27', 50, 395)
            .text('Débutante III:' + req.usuario.deb3 + '/20', 50 , 410)
            .text('Intermédiaire I:' + req.usuario.inter1 + '/12', 50, 425)
            .text('Intermédiaire II:' + req.usuario.inter2 + '/11', 50, 440)
            .text('Intermédiaire III:' + req.usuario.inter3 + '/9', 50, 455)
            .text('Avancé I:' + req.usuario.avanc1 + '/7', 50, 470);
        
        doc.fontSize(18)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.resultado, 75, 500);
        
        doc.end();
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
    res.render("avanzado-II-Examen");
});

router.post("/avanzado-II", (req, res, next) => {
    var A1 = req.body.A1.toLowerCase();
    var D1 = req.body.D1.toLowerCase();
    var B2 = req.body.B2;
    var A3 = req.body.A3;
    var C3 = req.body.C3;
    var B4 = req.body.B4.toLowerCase();
    var A5 = req.body.A5;
    var avanc2 = 0;
    if(A1 === "sois"){
        avanc2++;
    }
    if(D1 === "dessinions"){
        avanc2++;
    }
    if(B2 === "faire"){
        avanc2++;
    }
    if(A3 === "la lui"){
        avanc2++;
    }
    if(C3 === "les lui"){
        avanc2++;
    }
    if(B4 === "avoir assité"){
        avanc2++;
    }
    if(A5 === "tu serais parti"){
        avanc2++;
    }
    console.log(avanc2);
    req.usuario.avanc2 = avanc2;
    if(avanc2 < 5){
        req.usuario.resultado = "Avancé II: Entre Nous III (4, 5 et 6).";
        doc.pipe(fs.createWriteStream(__dirname + '/PDF/' + req.usuario.username + '-resultado' +'.pdf'));    
        doc.image('public/pdf-logo.jpg', 0, 0)
            .fontSize(24)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.nombre + ' '+ req.usuario.a_paterno + ' ' + req.usuario.a_materno, 50, 230);

        doc.fontSize(17)
            .font('public/fonts/ariali.ttf')
            .text('Les résultats', 50, 300);

        doc.fontSize(12)
            .font('public/fonts/verdana.ttf')
            .text('Correo electrónico: ' + req.usuario.correo, 50, 325)
            .text('Télefono: ' + req.usuario.telefono, 50, 340)
            .text('A continuación damos a conocer los resultados del alumno/a:', 50, 355)
            .text('Débutante I:' + req.usuario.deb1 + '/17', 50, 380)
            .text('Débutante II:' + req.usuario.deb2 + '/27', 50, 395)
            .text('Débutante III:' + req.usuario.deb3 + '/20', 50 , 410)
            .text('Intermédiaire I:' + req.usuario.inter1 + '/12', 50, 425)
            .text('Intermédiaire II:' + req.usuario.inter2 + '/11', 50, 440)
            .text('Intermédiaire III:' + req.usuario.inter3 + '/9', 50, 455)
            .text('Avancé I:' + req.usuario.avanc1 + '/7', 50, 470)
            .text('Avancé II:' + req.usuario.avanc2 + '/7', 50, 485);
        
        doc.fontSize(18)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.resultado, 75, 515);
        
        doc.end();
    }
    req.usuario.save((err) => {
        if(err){
            next(err);
            return;
        }
        res.redirect("/avanzado-II-resultado");
    });
});

router.get("/avanzado-III", (req, res, next) => {
    res.render("avanzado-III-examen");
});

router.post("/avanzado-III", (req, res, next) => {
    var B1 = req.body.B1.toLowerCase();
    var B2 = req.body.B2.toLowerCase();
    var B3 = req.body.B3;
    var A5 = req.body.A5;
    var B6 = req.body.B6;
    var A7 = req.body.A7.toLowerCase();
    var B8 = req.body.B8;
    var avanc3 = 0;
    if(B1 === "je n'en ai pas"){
        avanc3++;
    }
    if(B2 === "arrivée" || "arrivé"){
        avanc3++;
    }
    if(B3 === "A"){
        avanc3++;
    }
    if(A5 === "que"){
        avanc3++;
    }
    if(B6 === "dont"){
        avanc3++;
    }
    if(A7 === "les diamants ont été pris par les cambrioleurs"){
        avanc3++;
    }
    if(B8 === "bien que"){
        avanc3++;
    }
    console.log(avanc3);
    req.usuario.avanc3 = avanc3;
    if(avanc3 < 5){
        req.usuario.resultado = "Avancé III: Entre Nous III (7 et 8).";
        doc.pipe(fs.createWriteStream(__dirname + '/PDF/' + req.usuario.username + '-resultado' +'.pdf'));    
        doc.image('public/pdf-logo.jpg', 0, 0)
            .fontSize(24)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.nombre + ' '+ req.usuario.a_paterno + ' ' + req.usuario.a_materno, 50, 230);

        doc.fontSize(17)
            .font('public/fonts/ariali.ttf')
            .text('Les résultats', 50, 300);

        doc.fontSize(12)
            .font('public/fonts/verdana.ttf')
            .text('Correo electrónico: ' + req.usuario.correo, 50, 325)
            .text('Télefono: ' + req.usuario.telefono, 50, 340)
            .text('A continuación damos a conocer los resultados del alumno/a:', 50, 355)
            .text('Débutante I:' + req.usuario.deb1 + '/17', 50, 380)
            .text('Débutante II:' + req.usuario.deb2 + '/27', 50, 395)
            .text('Débutante III:' + req.usuario.deb3 + '/20', 50 , 410)
            .text('Intermédiaire I:' + req.usuario.inter1 + '/12', 50, 425)
            .text('Intermédiaire II:' + req.usuario.inter2 + '/11', 50, 440)
            .text('Intermédiaire III:' + req.usuario.inter3 + '/9', 50, 455)
            .text('Avancé I:' + req.usuario.avanc1 + '/7', 50, 470)
            .text('Avancé II:' + req.usuario.avanc2 + '/7', 50, 485)
            .text('Avancé III:' + req.usuario.avanc3 + '/7', 50, 500);
        
        doc.fontSize(18)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.resultado, 75, 530);
        
        doc.end();
    }
    req.usuario.save((err) => {
        if(err){
            next(err);
            return;
        }
        res.redirect("/avanzado-III-Resultado");
    });
});

router.get("/avanzado-I-resultado",(req, res, next) => {
    res.render("avanzado-I-Resultado");
});

router.get("/avanzado-II-resultado", (req, res, next) => {
    res.render("avanzado-II-Resultado");
});

router.get("/avanzado-III-resultado", (req, res, next) => {
    res.render("avanzado-III-Resultado");
});

router.get("/perf-I", (req, res, next) => {
    res.render("perf-I-Examen");
});

router.post("/perf-I", (req, res, next) => {
    var A1 = req.body.A1.toLowerCase();
    var A2 = req.body.A2.toLowerCase();
    var A3 = req.body.A3.toLowerCase();
    var B3 = req.body.B3.toLowerCase();
    var perf1 = 0;
    if(A1 === "lequel"){
        perf1++;
    }
    if(A2 === "aurons compris"){
        perf1++;
    }
    if(A3 === "d'utiliser cette plante"){
        perf1++;
    }
    if(B3 === "ça allait guérir ma toux"){
        perf1++;
    }
    console.log(perf1);
    req.usuario.perf1 = perf1;
    if(perf1 < 2){
        req.usuario.resultado = "Perf I: Entre Nous IV (1, 2 et 3).";
        doc.pipe(fs.createWriteStream(__dirname + '/PDF/' + req.usuario.username + '-resultado' +'.pdf'));    
        doc.image('public/pdf-logo.jpg', 0, 0)
            .fontSize(24)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.nombre + ' '+ req.usuario.a_paterno + ' ' + req.usuario.a_materno, 50, 230);

        doc.fontSize(17)
            .font('public/fonts/ariali.ttf')
            .text('Les résultats', 50, 300);

        doc.fontSize(12)
            .font('public/fonts/verdana.ttf')
            .text('Correo electrónico: ' + req.usuario.correo, 50, 325)
            .text('Télefono: ' + req.usuario.telefono, 50, 340)
            .text('A continuación damos a conocer los resultados del alumno/a:', 50, 355)
            .text('Débutante I:' + req.usuario.deb1 + '/17', 50, 380)
            .text('Débutante II:' + req.usuario.deb2 + '/27', 50, 395)
            .text('Débutante III:' + req.usuario.deb3 + '/20', 50 , 410)
            .text('Intermédiaire I:' + req.usuario.inter1 + '/12', 50, 425)
            .text('Intermédiaire II:' + req.usuario.inter2 + '/11', 50, 440)
            .text('Intermédiaire III:' + req.usuario.inter3 + '/9', 50, 455)
            .text('Avancé I:' + req.usuario.avanc1 + '/7', 50, 470)
            .text('Avancé II:' + req.usuario.avanc2 + '/7', 50, 485)
            .text('Avancé III:' + req.usuario.avanc3 + '/7', 50, 500)
            .text('Perf I:' + req.usuario.perf1 + '/4', 50, 515);
        
        doc.fontSize(18)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.resultado, 75, 545);
        
        doc.end();
    }
    req.usuario.save((err) => {
        if(err){
            next(err);
            return;
        }
        res.redirect("/perf-I-resultado");
    });
});

router.get("/perf-II", (req, res, next) => {
    res.render("perf-II-examen");
});

router.post("/perf-II", (req, res, next) => {
    var A1 = req.body.A1;
    var B1 = req.body.B1;
    var A2 = req.body.A2.toLowerCase();
    var A3 = req.body.A3.toLowerCase();
    var B3 = req.body.B3.toLowerCase();
    var A4 = req.body.A4.toLowerCase();
    var B4 = req.body.B4.toLowerCase();
    var A5 = req.body.A5.toLowerCase();
    var A6 = req.body.A6;
    var A7 = req.body.A7;
    var perf2 = 0;
    if(A1 === "afin que"){
        perf2++;
    }
    if(B1 === "pour"){
        perf2++;
    }
    if(A2 === "cette pharmacie ne vend que des médicaments génériques"){
        perf2++;
    }
    if(A3 === ""){
        perf2++;
    }
    if(B3 === ""){
        perf2++;
    }
    if(A4 === ""){
        perf2++;
    }
    if(B4 === "s"){
        perf2++;
    }
    if(A5 === "nous protégions la planète"){
        perf2++;
    }
    if(A6 === "plusieurs"){
        perf2++;
    }
    if(A7 === "grâce à"){
        perf2++;
    }
    console.log(perf2);
    req.usuario.perf2 = perf2;
    if(perf2 < 7){
        req.usuario.resultado = "Perf II: Entre Nous IV (4, 5 et 6).";
        doc.pipe(fs.createWriteStream(__dirname + '/PDF/' + req.usuario.username + '-resultado' +'.pdf'));    
        doc.image('public/pdf-logo.jpg', 0, 0)
            .fontSize(24)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.nombre + ' '+ req.usuario.a_paterno + ' ' + req.usuario.a_materno, 50, 230);

        doc.fontSize(17)
            .font('public/fonts/ariali.ttf')
            .text('Les résultats', 50, 300);

        doc.fontSize(12)
            .font('public/fonts/verdana.ttf')
            .text('Correo electrónico: ' + req.usuario.correo, 50, 325)
            .text('Télefono: ' + req.usuario.telefono, 50, 340)
            .text('A continuación damos a conocer los resultados del alumno/a:', 50, 355)
            .text('Débutante I:' + req.usuario.deb1 + '/17', 50, 380)
            .text('Débutante II:' + req.usuario.deb2 + '/27', 50, 395)
            .text('Débutante III:' + req.usuario.deb3 + '/20', 50 , 410)
            .text('Intermédiaire I:' + req.usuario.inter1 + '/12', 50, 425)
            .text('Intermédiaire II:' + req.usuario.inter2 + '/11', 50, 440)
            .text('Intermédiaire III:' + req.usuario.inter3 + '/9', 50, 455)
            .text('Avancé I:' + req.usuario.avanc1 + '/7', 50, 470)
            .text('Avancé II:' + req.usuario.avanc2 + '/7', 50, 485)
            .text('Avancé III:' + req.usuario.avanc3 + '/7', 50, 500)
            .text('Perf I:' + req.usuario.perf1 + '/4', 50, 515)
            .text('Perf II:' + req.usuario.perf2 + '/10', 50, 530);
        
        doc.fontSize(18)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.resultado, 75, 560);
        
        doc.end();
    }
    req.usuario.save((err) => {
        if(err){
            next(err);
            return;
        }
        res.redirect("/perf-II-resultado");
    });
});


router.get("/perf-III", (req, res, next) => {
    res.render("perf-III-examen");
});

router.post("/perf-III", (req, res, next) => {
    var A1 = req.body.A1;
    var A2 = req.body.A2;
    var A3 = req.body.A3.toLowerCase();
    var A4 = req.body.A4;
    var B4 = req.body.B4;
    var C4 = req.body.C4;
    var D4 = req.body.D4;
    var E4 = req.body.E4;
    var A5 = req.body.A5.toLowerCase();
    var B5 = req.body.B5.toLowerCase();
    var A6 = req.body.A6;
    var perf3 = 0;
    if(A1 === "puisque"){
        perf3++;
    }
    if(A2 === "dés que"){
        perf3++;
    }
    if(A3 === "ait pu"){
        perf3++;
    }
    if(A4 === "alla"){
        perf3++;
    }
    if(B4 === "fit"){
        perf3++;
    }
    if(C4 === "revint"){
        perf3++;
    }
    if(D4 === "vit"){
        perf3++;
    }
    if(E4 === "s'approcha"){
        perf3++;
    }
    if(A5 === "le jour où"){
        perf3++;
    }
    if(B5 === "après que"){
        perf3++;
    }
    if(A6 === "tant de"){
        perf3++;
    }
    console.log(perf3);
    req.usuario.perf3 = perf3;
    req.usuario.resultado = "Perf III: Entre Nous IV (7 et 8).";
    doc.pipe(fs.createWriteStream(__dirname + '/PDF/' + req.usuario.username + '-resultado' +'.pdf'));    
        doc.image('public/pdf-logo.jpg', 0, 0)
            .fontSize(24)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.nombre + ' '+ req.usuario.a_paterno + ' ' + req.usuario.a_materno, 50, 230);

        doc.fontSize(17)
            .font('public/fonts/ariali.ttf')
            .text('Les résultats', 50, 300);

        doc.fontSize(12)
            .font('public/fonts/verdana.ttf')
            .text('Correo electrónico: ' + req.usuario.correo, 50, 325)
            .text('Télefono: ' + req.usuario.telefono, 50, 340)
            .text('A continuación damos a conocer los resultados del alumno/a:', 50, 355)
            .text('Débutante I:' + req.usuario.deb1 + '/17', 50, 380)
            .text('Débutante II:' + req.usuario.deb2 + '/27', 50, 395)
            .text('Débutante III:' + req.usuario.deb3 + '/20', 50 , 410)
            .text('Intermédiaire I:' + req.usuario.inter1 + '/12', 50, 425)
            .text('Intermédiaire II:' + req.usuario.inter2 + '/11', 50, 440)
            .text('Intermédiaire III:' + req.usuario.inter3 + '/9', 50, 455)
            .text('Avancé I:' + req.usuario.avanc1 + '/7', 50, 470)
            .text('Avancé II:' + req.usuario.avanc2 + '/7', 50, 485)
            .text('Avancé III:' + req.usuario.avanc3 + '/7', 50, 500)
            .text('Perf I:' + req.usuario.perf1 + '/4', 50, 515)
            .text('Perf II:' + req.usuario.perf2 + '/10', 50, 530)
            .text('Perf III:' + req.usuario.perf3 + '/11', 50, 545);
        
        doc.fontSize(18)
            .font('public/fonts/ariali.ttf')
            .text(req.usuario.resultado, 75, 610);
        
        doc.end();
    req.usuario.save((err) => {
        if(err){
            next(err);
            return;
        }
        res.redirect("/perf-III-resultado");
    });
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