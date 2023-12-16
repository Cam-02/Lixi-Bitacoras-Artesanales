var obligasesion = function(request,response,next){
    var idusuario = request.session._id
  
    if(idusuario == undefined  || idusuario == null || idusuario == ""){
      response.json({ state: false, mensaje:"debe iniciar sesion"})
  
    }
    else{
      next()
    }
  
}

var soloadmin = function (request,response,next) {
    var rol = request.session.rol 

    if( rol != 1){
        response.json({ state: false, mensaje:"solo administradores pueden usar esta api"})
    
      }
      else{
        next()
      }
    
}
  

var usuariosController = require("./API/Controlador/usuariosController").usuariosController

app.post("/usuarios/Guardar",function(request,response){
    usuariosController.Guardar(request,response)
})

app.post ("/usuarios/Modificar", obligasesion, function (request, response){
    usuariosController.Modificar(request,response)
})

app.post("/usuarios/Eliminar", obligasesion, function(request,response){
    usuariosController.Eliminar(request,response)
})
app.post("/usuarios/ListarTodos", obligasesion, function (request,response){
    usuariosController.ListarTodos(request,response)
})
app.post("/usuarios/ListarporID", obligasesion, function (request,response){
    usuariosController.ListarporID(request,response)
})
app.post("/usuarios/Login", function (request,response){
    usuariosController.Login(request,response)
})
app.post("/usuarios/activarcuenta", function (request,response){
    usuariosController.activarcuenta(request,response)
})
app.post("/usuarios/state", function (request,response){
    response.json(request.session)
})
app.post("/usuarios/logout", function (request,response){
    request.session.destroy()
    response.json({state: true, mensaje:"Se cerro la Sesion"})
})