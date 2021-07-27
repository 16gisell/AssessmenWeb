const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async(req, res)=>{
    const user = await User.find();
    res.json(user);
})

router.post('/cola', async(req, res)=>{
    const {id_user, nameUser, action} = req.body;   
    const usuarios = await User.findOne({id_user:id_user})
    if(usuarios){
        res.status(404).send({error:"Este usuario ya posee un ticket"})
    }else{
        const NewUser= new User({id_user, nameUser, action});
        await NewUser.save()
        .then((data) => {
            res.send({message: "Registrado Usuario nuevo"})
        })
        .catch((err) => {
            res.json(err)
        })        
    }   
    
    
})

router.put('/:id', async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id, req.body)
    .then((data)=>{
        res.send(data)
    })
    .catch((err) => {
        res.json(err)
    })
})

router.delete('/:id', async( req, res)=>{
    await User.findByIdAndDelete(req.params.id)
    .then((data)=>{
        res.send({message: "delete user"})
    })
    .catch((err) => {
        res.json(err)
    })
})
module.exports = router;