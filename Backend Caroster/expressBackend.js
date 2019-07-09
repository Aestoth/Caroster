const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL || "localhost";
mongoose.connect(
  `mongodb://${MONGO_URL}/caroster`,
  {
    useNewUrlParser: true
  }
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
  nomVoiture: String,
  sieges: Number,
  contact: String,
  infoComp: String,
  adresse: String,
  date: String,
  horaire: String
});

const PostModelVoiture = mongoose.model("voiture", PostShemaVoiture, "voiture");

const PostShemaPassagers = mongoose.Schema({
  nom: String
  //evenement: [{ type: PostShemaPassagers.Types.ObjectId, ref: "evenement" }]
});
const PostModelPassagers = mongoose.model(
  "passagers",
  PostShemaPassagers,
  "passagers"
);

mongoose.set("useFindAndModify", false);
const PORT = 3000;

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Function Evenement//////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/api/event/new", (req, res) => {
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

app.get("/api/event", (req, res) => {
  PostModelEvenement.find((err, result) => {
    if (err) res.send({ success: false, msg: err });

    res.send({ success: true, result: result });
  });
});

app.get("/api/event/:id", (req, res) => {
  let id = req.params.id;
  PostModelEvenement.findById(id).then(doc => {
    if (!doc) {
      return res.status(404).end();
    }
    return res.status(200).json(doc);
  });
});

app.post("/api/event/delete/:id", (req, res) => {
  let id = req.params.id;
  PostModelEvenement.findById(id).deleteOne((err, result) => {
    if (err) res.send({ success: false, msg: err });

    res.send({ success: true, result: result });
  });
});

//Function new Passagers////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/api/passagers/new", (req, res) => {
  let payload = {
    nom: req.body.nom
  };

  const newPost = PostModelPassagers(payload);
  newPost.save((err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
  });
});

app.get("/api/passagers", (req, res) => {
  PostModelPassagers.find((err, result) => {
    if (err) res.send({ success: false, msg: err });

    res.send({ success: true, result: result });
  });
});

app.post("/api/passagers/update/:id", (req, res) => {
  let id = req.params.id;
  let payload = req.body;
  PostModelPassagers.findOneAndUpdate(
    { _id: id },
    { $set: payload },
    (err, result) => {
      if (err) res.send({ success: false, msg: err });

      res.send({ success: true, result: result });
    }
  );
});

app.post("/api/passagers/delete/:id", (req, res) => {
  let id = req.params.id;
  PostModelPassagers.findById(id).deleteOne((err, result) => {
    if (err) res.send({ success: false, msg: err });

    res.send({ success: true, result: result });
  });
});

//Function new Voiture/////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/api/ajouter-voiture", (req, res) => {
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

// Sert les fichiers du frontend
app.use(express.static("../Frontend caroster/build"));
app.use((req, res) =>
  res.sendFile(path.join(__dirname, "../Frontend caroster/build/index.html"))
);

app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
