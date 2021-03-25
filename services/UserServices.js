const Users = require('../models/Users')

//*Funciones que se conectan a la BD y son para hacer acciones en la BD 

const createUser = async ()=>{
    if(!user) throw new Error("No hay usuario")
    const dbUser = await Users.create(user)
    return dbUser
}

const findUsers = async ()=>{
    return await Users.find({})
}

const findUserbyId = async (id)=>{
    
    //*Otra forma de hacerlo con Promesa 
    // return new Promise ((resolve,reject)=>{
    //     Users.findById(id).then((user)=>{
    //         if(!user)
    //         resolve(user)
    //     }).catch((error)=>{
    //         reject(error)
    //     })
    // })

    //* aque es con async
const user = await Users.findById(id);
if(!user) throw new Error("no hay usuari")
return user
}

const updateUser = async (id,user)=>{
    //* se pone {...user} porque estamos creando una copia de user para no afectar el original y se sustituye por esa copia
    const userDb = await Users.updateOne({_id:id},{$set:{...user}},{new:true})
    if(!userDb) throw new Error("usuario no encontrado")
    return userDb
}

const deleteUser = async (id)=>{
    return await Users.deleteOne({_id:id})
}

module.exports = {
    createUser,
    findUsers,
    updateUser,
    findUserbyId, 
    deleteUser
}

