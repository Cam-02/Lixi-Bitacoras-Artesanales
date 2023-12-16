//variables iniciales
var express = require("express")
global.app = express() 
var bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const mongoose = require("mongoose")
global.config = require("./config.js").config
global.sha256 = require('sha256')

app.all('*', function(req, res, next) {

    var whitelist = req.headers.origin;
    res.header('Access-Control-Allow-Origin', whitelist);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
    res.header('Access-Control-Allow-Headers', " authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Credentials", "true");
    // res.header('Set-Cookie: cross-site-cookie=name; SameSite=None; Secure');


    next();

});

var cors  = require(`cors`)

app.use(cors({
    origin: function(origin,callback){
        console.log(origin)
        if(!origin){
            return callback(null,true)
        }
        if(config.listablanca.indexOf(origin) === -1){
            return callback("error de cors", false)
        }
        return callback(null,true)
    }
}))

const MongoStore = require("connect-mongo")
//CONFIGURACION DE SESION
var session = require("express-session") ({
    secret:config.secretsesion,
    resave:true,
    saveUnitialized:true,
    cookie:{path:"/", httpOnly:true, maxAge:config.tiemposesion},
    name:config.namecookie,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/lixi2023Cookie"})
})
app.use(session)
//enlace con rutas
require("./routes.js")

mongoose.connect("mongodb://127.0.0.1:27017/" + config.bd, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((res) => {
    console.log("Conexion Correcta a Mongo")
}).catch((error) => {
    console.log(error)
})

//enlace con frontend
app.use("/",express.static(__dirname + "/Frontend"))
//puerto
app.listen(config.puerto, function() {
    console.log("Servidor funcionando por el puerto" + config.puerto)
})