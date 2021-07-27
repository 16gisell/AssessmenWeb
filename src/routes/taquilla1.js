const express = require('express');
const router = express.Router();
const Taquilla = require('../models/Taquilla1');

router.get('/', async(req, res)=>{
    const taquilla = await Taquilla.find();
    res.json(taquilla);
})

router.get('/:idUser', async(req, res)=>{
    const taquilla = await Taquilla.findById(req.params.idUser)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
})

router.post('/ticke1', async(req, res)=>{
    const {idUser}= req.body;
    const NewTaquilla = new Taquilla({idUser});
    await NewTaquilla.save()
    .then((data)=> {
        res.send(data)
    })
    .catch((err)=>{
        res.json(err)
    })
})

router.put('/:id', async(req,res)=>{
    await Taquilla.findByIdAndUpdate(req.params.id, req.body)
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.json(err)
    })
})

router.delete('/:id', async(req, res)=>{
    await Taquilla.findOneAndDelete(req.params.id)
    .then((data)=>{
        res.send({message:"Usuario atendido"})
    })
    .catch((err)=>{
        res.json(err)
    })
})
module.exports = router;