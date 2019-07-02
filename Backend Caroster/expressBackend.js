const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect(
  "mongodb://localhost/carosterTest",
  { useNewUrlParser: true }
);

mongoose.connection.on("connected", err => {
  if (err) throw err;
  console.log("Connecté a la Base de donnees");
});

const PostSchemaEvenement = mongoose.Schema({
  titre: String,
  email: String
});

const PostModelEvenement = mongoose.model(
  "evenement",
  PostSchemaEvenement,
  "evenement"
);

const PostShemaVoiture = mongoose.Schema({
  nom: String,
  siege: Number,
  contact: String,
  infoComp: String,
  adresse: String,
  date: String,
  horaire: String
});

const PostModelVoiture = mongoose.model("voiture", PostShemaVoiture, "voiture");

const PostShemaPassagers = mongoose.Schema({
  nom: String
});
const PostModelPassagers = mongoose.model(
  "passagers",
  PostShemaPassagers,
  "passagers"
);

mongoose.set("useFindAndModify", false); //verifier!!!!!!!!!!!!!!!!!!!!

const PORT = 3000;

app.use(morgan("combined "));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Salut a tous");
});

//Function new evenement//////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/api/post/new", (req, res) => {
  let payload = {
    titre: req.body.titre,
    email: req.body.email
  };

  const newPost = PostModelEvenement(payload);
  newPost.save((err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
  });
});

//Function new Passagers////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/api/post/passagers", (req, res) => {
  let payload = {
    nom: req.body.nom
  };

  const newPost = PostModelPassagers(payload);
  newPost.save((err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
  });
});

app.get("/api/get/passagers", (req, res) => {
  PostModelPassagers.find((err, result) => {
    if (err) res.send({ success: false, msg: err });

    res.send({ success: true, result: result });
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/api/post/update", (req, res) => {
  let id = req.body._id;
  let payload = req.body;
  PostModel.findOneAndUpdate(id, payload, (err, result) => {
    if (err) res.send({ success: false, msg: err });

    res.send({ success: true, result: result });
  });
});

app.post("/api/post/remove", (req, res) => {
  let id = req.body._id;
  PostModel.findById(id).deleteOne((err, result) => {
    if (err) res.send({ success: false, msg: err });

    res.send({ success: true, result: result });
  });
});

//Modifier Passagers///////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/api/post/passagers/modifier", (req, res) => {
  let id = req.body._id;
  let payload = req.body;
  PostModelPassagers.findOneAndUpdate(id, payload, (err, result) => {
    if (err) res.send({ success: false, msg: err });

    res.send({ success: true, result: result });
  });
});

//Function new Voiture/////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/api/post/voiture", (req, res) => {
  let payload = {
    nom: req.body.nom,
    siege: req.body.siege,
    contact: req.body.contact,
    infoComp: req.body.infoComp,
    adresse: req.body.adresse,
    date: req.body.date,
    horaire: req.body.horaire
  };

  const newPost = PostModelVoiture(payload);
  newPost.save((err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
  });
});

//Récupérer Voiture///////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/api/voiture/all", (req, res) => {
  PostModel.find((err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
  });
});

//Récupérer Voiture par ID ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/api/voiture/:id", (req, res) => {
  PostModel.findById(req.params.id, (err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
  });
});

//Mise à jour Voiture par ID ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.put("/api/voiture/update/:id", (req, res) => {
  const postData = req.body;
  PostModel.findByIdAndUpdate(req.params.id, postData, (err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
  });
});

//Delete Voiture///////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.delete("/api/voiture/delete/:id", (req, res) => {
  PostModel.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
  });
});

app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
