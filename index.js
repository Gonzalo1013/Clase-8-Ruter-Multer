const express = require("express")
const app = express()
const multer = require('multer')
const fs = require('fs')
// const path = require("path")


const addPerson = require("./routers/postProduct");
const allPerson = require("./routers/getProduct");
const getById = require('./routers/getIdProduct');
const deletePerson = require('./routers/deleteProduct');
const putPerson = require('./routers/putProduct')

app.use(express.json()) //Para que funcione req.body ya que lee solo formato json

app.use("/api/persons", [allPerson, addPerson, getById, deletePerson, putPerson]) //Todas las module exports con metodos

//PATH principal con HTML de Public
app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/public/index.html")
})
//--------------------------------------------------------------------------------------------------

//MULTER PARA GUARDAR ARCHIVOS
let storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "uploads")
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    },
});

let upload = multer({storage:storage})

app.post('/' , upload.single('thumbnail'), (req, res) => {
    fs.readFile('./text.json' , 'utf-8' , (err, data) => {
        if(err){
            console.log('Error al leer el Archivo');
        }else{
            const arrayOfProduct = []
            let file = req.file
            if(data === ''){
                if(!file){
                    res.status(400).send({message: 'No se pudo cargar la imagen'})
                }else{
                    const {title, price} = req.body
                    let firstProduct = {
                            title,
                            price,
                            thumbnail: file.path,
                            id: 1
                        }
                    arrayOfProduct.push(firstProduct)
                    fs.writeFile('./text.json' , JSON.stringify(arrayOfProduct), 'utf-8' , (err) => {
                        if(err){
                            console.log('error al crear nuevo y primer producto');
                        }else{
                            console.log('Se guardo el primer Producto');
                            res.send({upload: 'ok', body: firstProduct})
                        }
                    })
                }
            }
        
            else{
                let parseData = JSON.parse(data)
                let ind = parseData[parseData.length -1]['id']
                let newId = ind +1
                if(!file){
                    res.status(400).send({messaje: 'No se encontro la imagen'})
                }else{
                    const {title, price} = req.body
                    let newProduct = {
                        title,
                        price,
                        thumbnail: file.path,
                        id: newId
                    }
                    parseData.push(newProduct)
                    fs.writeFile('./text.json' , JSON.stringify(parseData), 'utf-8' , (err) => {
                        if(err){
                            console.log('Error al escribir el archivo');
                        }else{
                            console.log('TODO OK');
                            res.send({upload: 'ok', body : newProduct})
                        }
                    })
                }    
            }
        }
    })
})



//-------------------------------------------------------------------------------------------

//SERVIDOR
app.listen(8080, ()=>{
    console.log("Server escuchando");
})

