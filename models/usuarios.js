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
    dateRegistrement: { type: Date, default: Date.now },
    correo: { type: String },
    telefono: { type: String },
    role: { type: String, default: "estudiante"},
    deb1: { type: Number },
    deb2: { type: Number },
    deb3: { type: Number },
    inter1: { type: Number },
    inter2: { type: Number },
    inter3: { type: Number },
    avanc1: { type: Number },
    avanc2: { type: Number },
    avanc3: { type: Number },
    perf1: { type: Number },
    perf2: { type: Number },
    perf3: { type: Number },
    perf4: { type: Number },
    resultado: { type: String }
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
    return (this.nombre + ' ' + this.a_paterno + ' ' + this.a_materno);
}

//regresar telefono
usuarioSchema.methods.telephone = function(){
    return ('Téléphone: ' + this.telefono);
}

//regresar correo
usuarioSchema.methods.email = function(){
    return('E-mail: ' + this.correo);
}

var Usuario = mongoose.model("Usuarios", usuarioSchema);
module.exports = Usuario;