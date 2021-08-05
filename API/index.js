const express = require ('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors')
// const bodyParser = require('body-parser');

//crear el servidor
const app = express();

//habilitar Cors y se proteje con cors para que solo los dominnos permitidos puedan consultar informacion
const whiteList = ['http://localhost:3000'];
const corsOptions ={
    origin: (origin, callback)=> {
        // console.log(origin);
        const existe = whiteList.some( dominio => dominio === origin);
        if(existe){
            callback(null, true)
        } else{
            callback(new Error('No Permitido por CORS'))
        }
    }
}

//se manda llamar el cors protegido 
// app.use(cors(corsOptions));

//dejamos el cors abierto
app.use(cors());

//Conectar a mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/veterinaria',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

//habilitar (bodyParser- deprecated)- middleware de express
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//habilitar routing
app.use('/',routes())

//puerto y arrancar el servidor
app.listen(4000,()=>{
    console.log('Servidor Funcionando');
});