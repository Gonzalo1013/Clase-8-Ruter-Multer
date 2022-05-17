const express = require('express')
const { Router } = express
const router = new Router()

const fs = require("fs");

const arrayProducts = []



router.post('/add', (req, res) => {
    // console.log(req.body);
    
    let {title, price, thumbnail} = req.body
    let firstProduct = {
        title,
        price,
        thumbnail,
        id: 1
    }
    arrayProducts.push(firstProduct)
        fs.readFile('./text.json' , 'utf-8', (err,data)=>{
            if(data ===""){
                console.log('No hay productos cargados');
                fs.writeFile('./text.json' , JSON.stringify(arrayProducts), 'utf-8' , (err,data)=>{
                    if(err){
                        res.send("No se pudo agregar el producto");
                    }else {
                        res.send({message: "El producto se agrego correctamente", product: firstProduct});
                    }
                })

            }else{
                const copy = JSON.parse(data)
                let ind = copy[copy.length -1]['id'] 
                let idd = ind +1 
                let {title, price, thumbnail} = req.body
                let newProduct = {
                    title,
                    price,
                    thumbnail,
                    id: idd
                }
                copy.push(newProduct)
                fs.unlink(`./text.json`, error =>{
                    if(error){
                        console.log("No se pudo reescribir");
                    }else{
                        console.log("Se reescribio el archivo correctamente");
                    }
                })
                fs.appendFile("./text.json", JSON.stringify(copy), "utf-8", (err,data)=>{
                    if(err){
                        res.send("Error al cargar");
                    }else{
                        res.send({message:'Se agrego una nueva persona correctamente.', product: newProduct});
                    }
                })
            }
        })
        res.send({message:'Se agrego una nueva persona correctamente.'})
    
})



module.exports = router
