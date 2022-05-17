const express = require('express')
const { Router } = express
const router = new Router()

const fs = require("fs");

const arrayProducts = []



router.post('/add', (req, res) => {
    // console.log(req.body);
    
    let {name, lastname, age, id} = req.body
    let newProduct = {
        name,
        lastname,
        age,
        id
    }
    arrayProducts.push(newProduct)
        fs.readFile('./text.json' , 'utf-8', (err,data)=>{
            if(data ===""){
                console.log('No hay productos cargados');
                fs.writeFile('./text.json' , JSON.stringify(arrayProducts), 'utf-8' , (err,data)=>{
                    if(err){
                        console.log("No se pudo agregar el producto");
                    }else {
                        console.log("El producto se agrego correctamente");
                    }
                })

            }else{
                const copy = JSON.parse(data)
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
                        console.log("Error al cargar");
                    }else{
                        console.log('Se agrego una nueva persona correctamente.');
                    }
                })
            }
        })
        res.send(`Se agrego la persona ${req.body.name} correctamente`)
    
})



module.exports = router
