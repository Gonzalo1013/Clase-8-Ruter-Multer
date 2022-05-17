const express = require("express");
const fs = require('fs');

const {Router} = express
const router = new Router()

router.get('/getById/:id', (req,res)=>{
    let itemId = req.params.id
    let idd = JSON.parse(itemId)

    fs.readFile('./text.json', 'utf-8', (err,data)=>{
        if(err){
            console.log("Error en la busqueda");
        }else{
            let product = JSON.parse(data)
            
            const itemFound = product.find((item) => item.id === idd)
            if(itemFound){
                res.send(itemFound)
            }else{
                res.send({Error : 'Producto no encontrado!'})
            }
        }
    })
})

module.exports = router