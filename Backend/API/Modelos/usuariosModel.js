const mongoose = require ("mongoose")
var usuariosModel = {}

const Schema = mongoose.Schema

var usuariosSchema = new Schema({
    nombre:String, 
    email:String,
    password:String,
    rol:Number,
    codact:String,
    estado:Number,
})

const Mymodel = mongoose.model("usuarios", usuariosSchema)

usuariosModel.Guardar = function(post,callback) {
    
    const instancia = new Mymodel
    instancia.nombre = post.nombre
    instancia.email = post.email
    instancia.password = post.password
    instancia.rol = 2
    /*ROL ==> 1:admin 2:cliente 3:facturador */
    instancia.codact = post.micodigo
    instancia.estado = 0


    instancia.save().then((res) => {
        console.log(res)
        return callback({state:true, mensaje:"Se almaceno correctamente"})
    }).catch((error) => {
        return callback({state:false, mensaj: "Se presento un error al almacenar" + error })
    })
    
}
usuariosModel.Modificar = function(post,callback){
    Mymodel.findByIdAndUpdate(post._id,
        {
            nombre:post.nombre,
            rol:post.rol
        }).then((res) => {
            console.log(res)
            callback({status: true, mensaje: "Se actualizo correctamente"})
        }).catch((error) =>{
            callback({state:false, mensaje: "El ID no esta en la base de datos"})
        })
}
usuariosModel.Eliminar = function(post,callback){
   Mymodel.findByIdAndDelete(post._id).then((res) =>{
    callback({state:true, mensaje: "Se elimino correctamente"})
   }).catch((error)=>{
    callback({state:false, mensaje: "El ID no esta en la base de datos"})
   })

}
usuariosModel.ListarTodos = function(post,callback) {
    
    Mymodel.find({},{password:0, codact:0}).then((res)=> {
        return callback(res)
    })
    // return callback(usuarios)
} 
usuariosModel.ListarporID = function(post,callback){
    Mymodel.find({_id:post._id},{password:0, codact:0}).then((res)=> {
        return callback(res)
    })

}
usuariosModel.existeEmail = function(post,callback){

    Mymodel.find({email: post.email},{}).then((rescod) => {
        console.log(rescod.length)
        if (rescod.length == 0) {
            return callback({existe: "No"})
        }
        else {
            return callback({existe: "Si"})
        }
    })
}
usuariosModel.Login = function(post,callback){
    Mymodel.find({email:post.email, password:post.password},{password:0, codact:0}).then((res)=> {
        if(res.length == 0){
            return callback({state:false, mensaje:"Sus credenciales son invalidas"})
        }
        else {
            return callback({state:true, mensaje: "Bienvenid@: " + res[0].nombre})
        }
    })
}
usuariosModel.EmailActivo = function(post,callback){
    Mymodel.find({email:post.email, password:post.password},{password:0, codact:0}).then((res)=> {
        if(res.length > 0){
            return callback({state:true, res:res})
        }
        else{
            return callback ({state:false})
        }
    })
}
usuariosModel.Cambiarestado = function(post,callback){
    
    Mymodel.findOneAndUpdate({email: post.email, codact:post.codigo},
        {
            estado:1
        }).then((res) => {
            console.log(res)
            callback({state: true})
        }).catch((error) =>{
            callback({state:false})
        })
}
usuariosModel.Buscarcodigodeact = function(post,callback){
    Mymodel.find({email:post.email, micodigo:post.micodigo},{estado:1}).then((res)=> {
        console.log(res)
        if(res.length == 0){
            return callback({state:false})
        }
        else{
            return callback ({state:true, estado: res[0].estado})
        }
    })
}
module.exports.usuariosModel = usuariosModel