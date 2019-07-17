const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL || "localhost";
mongoose.connect(`mongodb://${MONGO_URL}/caroster`, {
  useNewUrlParser: true
});

mongoose.connection.on("connected", err => {
  if (err) throw err;
  console.log("Connecté a la Base de donnees");
});

const PostSchemaEvent = mongoose.Schema({
  titre: String,
  email: String,
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "car" }],
  passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: "passengers" }]
});

const PostModelEvent = mongoose.model("event", PostSchemaEvent, "event");

const PostShemaCar = mongoose.Schema({
  nomVoiture: String,
  sieges: Number,
  contact: String,
  infoComp: String,
  adresse: String,
  date: String,
  horaire: String,
  passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: "passengers" }]
  //eventId: { type: mongoose.Schema.Types.ObjectId, ref: "event" },
  //passengersId: { type: mongoose.Schema.Types.ObjectId, ref: "passengers" }
});

const PostModelCar = mongoose.model("car", PostShemaCar, "car");

const PostShemaPassengers = mongoose.Schema({
  nom: String
  //evenementId: { type: mongoose.Schema.Types.ObjectId, ref: "event" },
  //carId: { type: mongoose.Schema.Types.ObjectId, ref: "car" }
});

const PostModelPassengers = mongoose.model(
  "passengers",
  PostShemaPassengers,
  "passengers"
);

mongoose.set("useFindAndModify", false);
const PORT = 3000;

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Function Evenement//////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/api/event", async (req, res) => {
  const newPost = PostModelEvent(req.body);
  const event = await newPost.save();
  res.status(200).json(event);
});

app.get("/api/event", (req, res) => {
  PostModelEvent.find((err, result) => {
    if (err) res.send({ success: false, msg: err });

    res.send({ success: true, result: result });
  });
});

app.get("/api/event/:id", (req, res) => {
  let id = req.params.id;
  PostModelEvent.findById(id)
    .populate("cars")
    .then(doc => {
      if (!doc) {
        return res.status(404).end();
      }
      return res.status(200).json(doc);
    });
});

app.put("/api/event/:id", (req, res) => {
  const postData = req.body;
  PostModelEvent.findByIdAndUpdate(req.params.id, postData, (err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
  });
});

app.delete("/api/event/:id", (req, res) => {
  PostModelEvent.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
  });
});

//Function Passagers////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/api/passengers", (req, res) => {
  PostModelPassengers.find((err, result) => {
    if (err) res.send({ success: false, msg: err });

    res.send({ success: true, result: result });
  });
});

app.post("/api/:id/passengersEvent", async (req, res) => {
  try {
    let { id } = req.params;
    const newPassengers = PostModelPassengers(req.body);
    console.log("newPassengers", newPassengers);

    const events = await PostModelEvent.findById(id);
    await newPassengers.save();

    await events.passengers.push(newPassengers);

    await events.save();
    res.status(201).json(newPassengers);
  } catch (err) {
    res.status(err.response.status);
    return res.send(err.message);
  }
});

app.post("/api/:id/passengersCar", async (req, res) => {
  try {
    let { id } = req.params;
    const newPassengers = PostModelPassengers(req.body);
    console.log("newPassengers", newPassengers);
    // Get User
    const car = await PostModelCar.findById(id);

    await newPassengers.save();
    // Add car to the Event array 'cars'
    await car.passengers.push(newPassengers);
    //Save the Event
    await car.save();
    res.status(201).json(newPassengers);
  } catch (err) {
    res.status(err.response.status);
    return res.send(err.message);
  }
});

app.get("/api/passengers/:id", (req, res) => {
  PostModelPassengers.findById(req.params.id, (err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
  });
});

app.put("/api/passengers/:id", (req, res) => {
  const postData = req.body;
  PostModelPassengers.findByIdAndUpdate(
    req.params.id,
    postData,
    (err, result) => {
      if (err) res.send({ success: false, msg: err });
      res.send({ success: true, result: result });
    }
  );
});

app.delete("/api/passengers/:id", (req, res) => {
  PostModelPassengers.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
  });
});

app.get("/api/event/:eventId/passengers", (req, res) => {
  const { eventId } = req.params;
  const events = PostModelEvent.findById(eventId)
    .populate("passengers")
    .exec((err, events) => {
      console.log("passengers", events.passengers);
      res.send(events.passengers);
    });
});

app.get("/api/car/:carId/passengers", (req, res) => {
  const { carId } = req.params;
  const cars = PostModelCar.findById(carId)
    .populate("passengers")
    .exec((err, cars) => {
      console.log("passengers", cars.passengers);
      res.send(cars.passengers);
    });
});

app.get("/api/:eventId/cars", (req, res) => {
  const { eventId } = req.params;
  const events = PostModelEvent.findById(eventId)
    .populate("cars")
    .exec((err, events) => {
      console.log("cars", events.cars);
      res.send(events.cars);
    });
});

// app.get("/api/:eventId/passengers", (req, res) => {
//   const { eventId } = req.params;
//   PostModelEvent.findById(eventId, (err, events) => {
//     if (err) res.send(err);
//     res.send(events.passengers);
//   });
// });

//Function new Voiture/////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/api/:id/ajouter-voiture", async (req, res) => {
  try {
    let { id } = req.params;
    const newVoiture = PostModelCar(req.body);
    console.log("newVoiture", newVoiture);
    // Get User
    const events = await PostModelEvent.findById(id);
    // Assign Evenement as a Cars

    // Save the car
    await newVoiture.save();
    // Add car to the Event array 'cars'
    await events.cars.push(newVoiture);
    //Save the Event
    await events.save();
    res.status(201).json(newVoiture);
  } catch (err) {
    // res.status(err.response.status);
    // return res.send(err.message);
  }
});

//Récupérer Voiture///////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/api/voiture", (req, res) => {
  PostModelCar.find((err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
  });
});

//Récupérer Voiture par ID ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/api/voiture/:id", (req, res) => {
  PostModelCar.findById(req.params.id, (err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
  });
});

//Mise à jour Voiture par ID ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.put("/api/voiture/update/:id", (req, res) => {
  const postData = req.body;
  PostModelCar.findByIdAndUpdate(req.params.id, postData, (err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
  });
});

//Delete Voiture///////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.delete("/api/voiture/delete/:id", (req, res) => {
  PostModelCar.findByIdAndDelete(req.params.id, (err, result) => {
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
