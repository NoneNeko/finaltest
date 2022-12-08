/*************************************************************************
* WEB322– Final Test
* I declare that this assignment is my own work in accordance with Seneca Academic
Policy. No part * of this assignment has been copied manually or electronically from any
other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Dai Dung Lam, Student ID: 137 632 196 Date: December-8th-2022
*
* Your app’s URL (from Cyclic) : https://kind-rose-ostrich-cape.cyclic.app
*
*************************************************************************/ 
const express = require("express");
var final = require("./final")
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

function onHttpStart(){
    console.log("Express http server listening on: "+ HTTP_PORT);
}

app.get('/', (req,res) =>{
    res.sendFile(__dirname + "/finalViews/home.html");
})

app.get('/register', (req,res) =>{
    res.sendFile(__dirname + "/finalViews/register.html");
    
})

app.post('/register', (req,res) =>{
    final.register(req.body).then((data) =>{
        let registerUser = data;
        let resText = "<br>"
        resText = JSON.stringify(registerUser) + "<br> <a href='/'>Go Home</a>"
        res.send(resText)
    }).catch((err) =>{
        res.send(err);
    });
})

app.get('/signIn', (req,res) =>{
    res.sendFile(__dirname + "/finalViews/signIn.html");
})

app.post('/signIn', (req,res) =>{
    final.signIn(req.body).then((data) =>{
        let registerUser = data;
        let resText = "<br>"
        resText = JSON.stringify(registerUser) + "<br> <a href='/'>Go Home</a>"
        res.send(resText)
    }).catch((err) =>{
        res.send(err);
    });
})

app.use((req,res) =>{
    res.status(404).send("Not Found");
})

final.startDB().then(() =>{
    app.listen(HTTP_PORT, onHttpStart);
}).catch((err) =>{
    console.log(err);
})