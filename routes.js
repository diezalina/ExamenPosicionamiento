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
    console.log(req.session);
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


//listado de estudiantes
router.get("/etudiantes", (req, res) => {
    Usuario.find()
        .exec((err, usuarios) => {
            if(err){
                return next(err);
            }
            res.render("etudiantes", { usuarios: usuarios});
        });
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