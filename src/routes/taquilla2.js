const express = require('express');
const router = express.Router();
const Taquilla2 = require('../models/Taquilla2');

router.get('/', async(req, res)=>{
    const taquilla = await Taquilla2.find();
    res.json(taquilla);
})

router.post('/ticke2', async(req, res)=>{
    const idUser= req.body;
    const NewTaquilla = new Taquilla2(idUser);
    await NewTaquilla.save()
    .then((data)=> {
        res.send(data)
    })
    .catch((err)=>{
        res.json(err)
    })
})

router.put('/:id', async(req,res)=>{
    await Taquilla2.findByIdAndUpdate(req.params.id, req.body)
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.json(err)
    })
})

router.delete('/:id', async(req, res)=>{
    await Taquilla2.findOneAndDelete(req.params.id)
    .then((data)=>{
        res.send({message:"Usuario atendido"})
    })
    .catch((err)=>{
        res.json(err)
    })
})
module.exports = router;