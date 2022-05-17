const express = require("express");
const fs = require('fs')
const {Router} = express
const router = new Router()

router.get('/delete/:id', (req,res) => {
    let itemId = req.params.id
    // let id = JSON.parse(itemId)
    fs.readFile('./text.json', 'utf-8', (err, data)=>{
        if(err){
            console.log('Error!! no se pudo eliminar el producto');
        }else{
            let product = JSON.parse(data)
            let itemFound = product.find((prod)=>prod.id === itemId)
            if(itemFound){
                let index = product.indexOf(itemFound)
                if(index > -1){
                    let itemDelete = product.splice(index,1)
                    const dProduct = JSON.stringify(itemDelete)
                    const newArray = product
                    fs.writeFile('./text.json', JSON.stringify(newArray), 'utf-8' , (err,data)=>{
                        if(err){
                            console.log('No se pudo reescribir el archivo');
                        }else{
                            console.log(`El producto ${dProduct} fue Eliminado del Stock`);
                        }
                    })
                }
                res.send( { message: `El producto con ID = ${itemId} fue eliminado`} )
            }
        }
    })
})

module.exports = router