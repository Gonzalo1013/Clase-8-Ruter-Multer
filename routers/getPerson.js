
const fs = require("fs")

const express = require("express")

const { Router } = express
const router = new Router()


router.get('/getAll', (req,res)=>{
    fs.readFile("./text.json", "utf-8", (err, data)=>{
        if(err){
            console.log("Error");
        }else{
            let allPersons = JSON.parse(data)
            // console.log(detail);
            res.send(allPersons);

        }
    })
})


module.exports = router
