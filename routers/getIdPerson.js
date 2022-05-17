const express = require("express");
const fs = require('fs');

const {Router} = express
const router = new Router()

router.get('/getById/:id', (req,res)=>{
    let itemId = req.params.id
    // let id = JSON.parse(itemId)

    fs.readFile('./text.json', 'utf-8', (err,data)=>{
        if(err){
            console.log("Error en la busqueda");
        }else{
            let product = JSON.parse(data)
            
            const itemFound = product.find((item) => item.id === itemId)
            if(itemFound){
                res.send(itemFound)
            }else{
                res.send({Error : 'Persona no encontrada'})
            }
        }
    })
})

module.exports = router