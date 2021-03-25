const UserServices = require('../services/UserServices')

const create = async(req,res)=>{
    try{
        const user = await UserServices.createUser(req.body);
        return res.status(201).send(user);
    }catch(error){
        return res.status(400).send(error);
    }
}

const fetch = async(req,res)=>{
    try{
        const users = await UserServices.findUsers();
        return res.status(200).send(users);
    }catch(error){
        res.status(400).send(error)
    }
}

const findOne = async(req,res)=>{
    try{
        const {id}= req.params;
        const user = await UserServices.findUserbyId(id);
        return res.status(200).send(user)
    }catch(error){
        return res.status(400).send(error)
    }
}

const update = async(req,res)=>{
    try{
        const {id} = req.params
        const user = req.body
        const userEdited = await UserServices.updateUser(id,user);
        return res.status(200).send(userEdited)
    }catch(error){
        return res.status(400).send(400)
    }
}

// const remove = async (req,res)=>{
//     try{
//         const {id}=req.params
//         const eliminate = await UserServices.deleteUser(id);
//         return res.status()
//     }catch(error){
//         res.status(400).send(error)
//     }
// }

module.exports={

}
