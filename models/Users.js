const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    //*Aqui voy a poner todos los atributos y tipo de datos de nuestro schema
    name: String,
    email:{
        type: String,
        unique:true,
        required:true
    },
    password:String,
    age:Number,
    gender:{
        type:String,
        enum: ['M','F','O']
    },
    birth_date: Date,
    photo:{
        type:String,
        //match: regex (esto es para url)
    }
},{timestamps:true}) //Agrega created and updated date

const users = mongoose.model('users',UserSchema)
//*Vincular la colección con el schema hecho arriba 

module.exports = users