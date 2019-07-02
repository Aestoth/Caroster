const express =require("express");
const morgan =require("morgan");
const bodyParser =require("body-parser");
const cors =require("cors");
const app =express();
const http = require('http');

// Configuration de Express
const hostname = '127.0.0.1';
const PORT =3001;
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

// Déclaration des routes
app.get("/",(req, res)=>{ 
    res.send("Hello world !");
});

app.post("/",(req, res)=>{ 
    res.json({message:"Hello World"});
});

// Lancement du serveur Web
app.listen(PORT,  
    ()=>console.log(`Serveur lancé sur le port ${hostname}:${PORT}`
));