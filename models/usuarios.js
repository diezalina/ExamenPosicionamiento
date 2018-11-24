var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var SALT_FACTOR = 10;

//Esquema de la clase Usuario
var usuarioSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    nombre: { type: String },
    a_paterno: { type: String },
    a_materno: { type: String },
    role: { type: String },
    correo: { type: String },
    telefono: { type: number }
});

var donothing = () =>{

}

//funcion de guardar
usuarioSchema.pre("save",function(done){
    var usuario = this;
    if(!usuario.isModified("password")){
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR,(err,salt) => {
        if(err){
            return done(err);
        }
        bcrypt.hash(usuario.password, salt, donothing,(err, hashedpassword) => {
            if(err){
                return done(err);
            }
            usuario.password = hashedpassword;
            done();
        });
    });
});

//Revisar contraseña
usuarioSchema.methods.checkPassword = function(guess, done) {
    bcrypt.compare(guess, this.password, function(err, isMatch){
        done(err, isMatch);
    });
}

//regresar el rol
usuarioSchema.methods.usrRole = function(){
    return this.role;
}

//Regresar el nombre
usuarioSchema.methods.name = function(){
    return this.username || (this.name + ' ' + this.a_paterno + ' ' + this.a_materno);
}

var Usuario = mongoose.model("Usuarios", usuarioSchema);
module.exports = Usuario;