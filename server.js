const express = require ('express');
const mongoose = require('mongoose');
const Users = require('./models/Users');

//! multer for data management
const multer = require('multer') 
//*Multer es un middleware para Express y Node. js que hace que sea 
//*fácil manipular multipart/form-data cuando tus usuarios suben archivos. 
//* lo procesa, utiliza y lo guarda

//!storage de firebase
const storage = require('./utils/storage')
//* posterior a esto se crea el middleware

const app = express();
const MONGO_URI = "mongodb+srv://prueba_esmi:prueba@cluster0.rlcwd.mongodb.net/apimongo?retryWrites=true&w=majority"

const mult = multer({
    storage: multer.memoryStorage(),// aqui se guarda
    limits:{
        fileSize: 5 * 1024 * 1024 // no archivos de más de 5 mb
    }
})

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//---------Conexión a MONGO-------
mongoose.connect(MONGO_URI,{
    //estos son para evitar unos warning
    useCreateIndex:true,
    useNewUrlParser:true,
    userUnifiedTopology: true
})
const db= mongoose.connection
//*se guarda el estatus de la conexión 

db.on('error',function(error){ //*Se ejecuta varias veces en busca de errores
    console.log('conection error',error)
})

db.once('open',function(){ //* Se eejecuta una sola vez, ejecutada la conexión
    console.log('connected to database')
})

//--------ROUTES-------

app.get('/users',(req,res)=>{
    Users.find({}).then((result)=>{
        res.status(200).send(result)
    }).catch((error)=>{
        res.status(400).send(error)
    })
})

//! entre ruta y controller se pone el middleware
//*  .single es solo una imagen
//*"photo" es el nombre identico como esta identificado en el body al ingresarlo
app.post('/users',mult.single('photo'),async (req,res)=>{
    if(req.file){ // o sea el archivo y sus datos del multer
        const url = await storage(req.file) //subo archivo a firebase}
        req.body.photo = url //guardo la url que regresa a la DB 
    }
    Users.create(req.body).then((user)=>{
        res.status(201).send(user)
    }).catch((error)=>{
        res.status(400).send(error)
    })
})


app.listen(3000,()=>{
    console.log("SERVER ON")
})

