const express = require("express");
const { json } = require("express/lib/response");
const { Router } = express
const router = new Router();
const fs = require('fs')


// router.put('/change/:id', (req, res) => {
// let itemId  = req.params.id-1
// let id = JSON.parse(itemId)
// console.log(req.body);
// const jsonData = fs.readFileSync('text.json')
// const data = JSON.parse(jsonData)
// console.log(data);

// data[id]["title"] = req.body.title;
// data[id]['price'] = req.body.price;
// data[id]['img'] = req.body.img

// fs.writeFileSync('text.json', (JSON.stringify(data)))
// res.json(data)
// })

router.put('/change/:id' ,  (req, res) => {
    let itemId = req.params.id-1
    let idIndex = JSON.parse(itemId)

    fs.readFile('./text.json', (err,data) =>{
        if(err){
            console.log('Error al modificar el producto');
        }else{
            let newData = JSON.parse(data)
            // console.log(newData);

            newData[idIndex]["name"] = req.body.name
            newData[idIndex]["lastname"] = req.body.lastname
            newData[idIndex]["age"] = req.body.age

            fs.writeFile('./text.json' , JSON.stringify(newData) , (err) => {
                if(err){
                    console.log("ERROR!!");
                }else{
                    res.send(`El archivo con id = ${req.params.id} fue modificado con exito`)
                    // res.json(newData)
                }
            })
        }
    })





    // res.send('Todo ok')
})

module.exports = router