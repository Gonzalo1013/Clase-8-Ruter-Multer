const express = require("express")
const app = express()
const multer = require('multer')
// const path = require("path")


const addPerson = require("./routers/postPerson");
const allPerson = require("./routers/getPerson");
const getById = require('./routers/getIdPerson');
const deletePerson = require('./routers/deletePerson');
const putPerson = require('./routers/putPerson')

app.use(express.json()) //Para que funcione req.body ya que lee solo formato json

app.use("/api/personas", [allPerson, addPerson, getById, deletePerson, putPerson]) //Todas las module exports con metodos

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

app.post('/uploadfile', upload.single('myFile'), (req, res)=>{
    console.log(req.file);
    const file = req.file
    if(!file){
        res.sendStatus(400).send({message: 'Error al guardar archivo'})
    }
    res.send( {message: 'Archivo guardado correctamente'} )
})  
//-------------------------------------------------------------------------------------------

//SERVIDOR
app.listen(8080, ()=>{
    console.log("Server escuchando");
})

