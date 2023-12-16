var usuariosModel= require("../Modelos/usuariosModel").usuariosModel
var usuariosController = {} 

usuariosController.Guardar = function(request,response) {
    try {
        var post = {
            nombre:request.body.nombre,
            email:request.body.email,
            password:request.body.password
        }

        if (post.nombre==undefined||post.nombre==null||post.nombre==""){
            response.json({state:false,mensaje:"el campo de nombre es obligatorio"})
            return false
        }
        if (post.email==undefined||post.email==null||post.email==""){
            response.json({state:false,mensaje:"el campo de email es obligatorio"})
            return false
        }
        //VALIDACION DEL EMAIL
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(post.email) == false) {
            console.log({ state: false, mensaje: "No es un correo valido" })
            return false
        }
        if (post.password==undefined||post.password==null||post.password==""){
            response.json({state:false,mensaje:"el campo de password es obligatorio"})
            return false
        }
        //RESTRICCIONES DE PASSWORD
        if (post.password.length>12) {
            response.json({state:false,mensaje:"El password no puede tener más de 12 caracteres"})
            return false
        }
        if (post.password.length<5) {
            response.json({state:false,mensaje:"El password no puede tener menos de 5 caracteres"})
            return false
        }

        post.password = sha256(post.password + config.secretEncrypt) //para encriptar la contraseña

        usuariosModel.existeEmail(post,function(res){
            if (res.existe == "No"){
                post.micodigo = "AC" + Math.floor(Math.random() * (9999 - 1000)+1000)
                usuariosModel.Guardar(post,function(respuesta){
                    if(respuesta.state == true){
                        //ENVIO DE CORREO ELECTRONICO
                        const nodemailer = require("nodemailer")

                        var transporter = nodemailer.createTransport({
                            // configuracion de parametros necesarios para generar conexion con el servidor
                            host:"smtp.gmail.com", //varia segun el tipo de correo
                            port:587, // puerto por el cual funciona el correo
                            requireTLS: true,
                            secure:false,
                            auth:{
                                user:config.userGmail, //correo desde donde saldrá el correo de confirmacion 
                                pass:config.passGmail //contraseña obtenida desde contraseñas de aplicacion en gmail
                            }
                        })
                        var mailOptions = {
                            from:config.userGmail,
                            to: post.email,
                            subject: "VERIFICA TU CUENTA",
                            html: `<div style="font-family: Arial, sans-serif;line-height: 1.6;background-color: #531253;margin: 0;padding: 42px;">

                            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px;
                                box-shadow: 0 0 10px color:#531253;">
                                <h1 style="font-size: 24px; color: #333333; margin-bottom: 20px;">Activación de cuenta</h1>
                                <p>Hola, Bienvenid@ a LIXI bitacoras artesanales</p>
                                <p>Gracias por registrarte en nuestro sitio. Para activar tu cuenta, haz clic en el siguiente enlace:</p>
                                <p><a style="display: inline-block; padding: 10px 20px; background-color: #337ab7; color: #ffffff;
                                text-decoration: none; border-radius: 3px;" 
                                href="http://localhost:4200/activarcuenta/${post.email}/${post.micodigo}">
                                Activar cuenta</a></p>
                                <p>Si el enlace no funciona, copia y pega la siguiente URL en tu navegador:</p>
                                <p>http://localhost:4200/activarcuenta/${post.email}/${post.micodigo}</p>
                                <p>Si no has creado una cuenta en nuestro sitio, puedes ignorar este correo electrónico.</p>
                                <p>Saludos,</p>
                                <p>El equipo de LIXI</p>
                            </div>
                    
                    `
                        }
                        transporter.sendMail(mailOptions,(error, info) =>{
                            if(error){
                                console.log(error)
                                response.json(error)
                            }
                            else{
                                response.json({state:true, mensaje: "Se creo el ususario correctamente, revisa tu bandeja de entrada para activar tu cuenta"})
                            }
                        })
                    }
                    else {
                        response.json(respuesta)
                    }
                })
            }
            else {
                response.json({state:false, mensaje: "El correo ya existe, intente con un codigo diferente"})
            }
    }) 
        
        
    } catch (error) {
        response.json({state:false, mensaje:"error inesperado", error:error })
        
    }
}
usuariosController.Modificar = function(request,response){
    var post = {
        _id:request.body._id,
        nombre:request.body.nombre,
        rol:request.body.rol
    }
    if (post._id==undefined || post._id==null ||post._id==""){
        response.json({state:false,mensaje:"El campo de ID es obligatorio"})
        return false
    }
    if (post.nombre==undefined||post.nombre==null||post.nombre==""){
        response.json({state:false,mensaje:"el campo de nombre es obligatorio"})
        return false
    }
    if (post.rol==undefined || post.rol==null ||post.rol==""){
        response.json({state:false,mensaje:"El campo de rol es obligatorio"})
        return false
    }
    usuariosModel.Modificar(post,function(respuesta){
        response.json(respuesta)
    })
    
}
usuariosController.Eliminar = function(request,response){
    var post = {
        _id:request.body._id
    }
    if (post._id==undefined || post._id==null ||post._id==""){
        response.json({state:false,mensaje:"el campo de ID es obligatorio"})
        return false
    }
    usuariosModel.Eliminar(post,function(respuesta){
        response.json(respuesta)
    })
}
usuariosController.ListarTodos = function(request,response) {
    usuariosModel.ListarTodos(null, function(respuesta){
        response.json(respuesta)
    })
}
usuariosController.ListarporID = function(request,response) {
    var post = {
        _id:request.body._id
    }
    if (post._id==undefined || post._id==null ||post._id==""){
        response.json({state:false,mensaje:"El campo de ID es obligatorio"})
        return false
    }
    usuariosModel.ListarporCodigo(post, function(respuesta){
        response.json(respuesta)
    })
}
usuariosController.Login = function(request,response) {
    var post = {
        email:request.body.email,
        password:request.body.password
    }
    if (post.email==undefined || post.email==null ||post.email==""){
        response.json({state:false,mensaje:"El Email es obligatorio"})
        return false
    }
    if (post.password==undefined || post.password==null ||post.password==""){
        response.json({state:false,mensaje:"El password es obligatorio"})
        return false
    }
    post.password = sha256(post.password + config.secretEncrypt)
    usuariosModel.EmailActivo(post,function(estado){
        if(estado.state == false){
            response.json({state:false, mensaje: "El email no es valido"})
            return false
        }
        else{
            if(estado.res[0].estado == 0){
                response.json({state:false, mensaje: "la cuenta no esta activa"})
            }
            else { usuariosModel.Login(post, function(respuesta){
                if(respuesta.state == true){

                  /*  request.session._id = respuesta.res[0]._id
                    request.session.nombre = respuesta.res[0].nombre
                    request.session.rol = respuesta.res[0].rol*/
                    response.json({state: true, mensaje: "Bienvenido: " /*+ respuesta.res[0].nombre*/})
                } else {
                    response.json({state: true, mensaje: "Sus credenciales no son validas"})
                }
                })

            }
        }
    })
   
}
usuariosController.activarcuenta = function(request,response) {
    var post = {
        email:request.body.email, 
        codigo:request.body.codigo
    }
    if (post.email==undefined || post.email==null ||post.email==""){
        response.json({state:false,mensaje:"El Email es obligatorio"})
        return false
    }
    if (post.codigo==undefined || post.codigo==null ||post.codigo==""){
        response.json({state:false,mensaje:"El codigo es obligatorio"})
        return false
    }

    usuariosModel.Buscarcodigodeact(post,function(respuesta){
        if(respuesta.state == false){
            console.log({state:false,mensaje:"Email o codigo invalido"})
            response.json({state:false,mensaje:"Email o codigo invalido"})
            return false
        }
        else {
            console.log(respuesta)
            if (respuesta.estado == 1){
                response.json({state:false,mensaje:"Su cuenta y se encontraba activa"})
                //response.send(`elemento de html para que el mensaje salga bnito`)
            } else {
                usuariosModel.Cambiarestado(post,function(resestado){
                    if(resestado.state == true){
                        response.json({state:true, mensaje: " Su cuenta ha sido activada con exito"})
                    }
                    else {
                        response.json({state:true, mensaje: "Se presentó un error al activar tu cuenta"})
                    }
                })
            }
        }
    })

}
module.exports.usuariosController = usuariosController