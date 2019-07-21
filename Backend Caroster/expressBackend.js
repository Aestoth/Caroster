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
  // eventId: { type: mongoose.Schema.Types.ObjectId, ref: "event" }
  //passengersId: { type: mongoose.Schema.Types.ObjectId, ref: "passengers" }
});

const PostModelCar = mongoose.model("car", PostShemaCar, "car");

PostShemaCar.pre("remove", function(next) {
  let car = this;
  car
    .model("event")
    .update(
      { cars: car._id },
      { $pull: { cars: car._id } },
      { multi: true },
      next
    );
});

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

//Add  Event //////////////////////////////////////////
app.post("/api/event", async (req, res) => {
  const newPost = PostModelEvent(req.body);
  const event = await newPost.save();
  res.status(200).json(event);
});

//Get Event //////////////////////////////////////////
app.get("/api/event", (req, res) => {
  PostModelEvent.find((err, result) => {
    if (err) res.send({ success: false, msg: err });

    res.send({ success: true, result: result });
  });
});

//Get Event by ID //////////////////////////////////////////
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

//Update Event //////////////////////////////////////////
app.put("/api/event/:id", (req, res) => {
  const postData = req.body;
  PostModelEvent.findByIdAndUpdate(req.params.id, postData, (err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
  });
});

//Delete Event //////////////////////////////////////////
app.delete("/api/event/:id", (req, res) => {
  PostModelEvent.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
  });
});

//Add Passengers into Event //////////////////////////////////////////
app.post("/api/:id/passengersEvent", async (req, res) => {
  try {
    let { id } = req.params;
    const newPassengers = PostModelPassengers(req.body);
    console.log("newPassengers", newPassengers);
    const events = await PostModelEvent.findById(id); // Get Event
    await newPassengers.save(); //Save the Passenger
    await events.passengers.push(newPassengers); // Add Passenger to the Event array 'events'
    await events.save(); //Save the Event
    res.status(201).json(newPassengers);
  } catch (err) {
    res.status(err.response.status);
    return res.send(err.message);
  }
});

//Add Passengers into  Car Event //////////////////////////////////////////
app.post("/api/:id/passengersCar", async (req, res) => {
  try {
    let { id } = req.params;
    const newPassengers = PostModelPassengers(req.body);
    console.log("newPassengers", newPassengers);
    const car = await PostModelCar.findById(id); // Get Car
    await newPassengers.save(); //Save the Passenger
    await car.passengers.push(newPassengers); // Add Passenger to the Event array 'cars'
    await car.save(); //Save the Car
    res.status(201).json(newPassengers);
  } catch (err) {
    res.status(err.response.status);
    return res.send(err.message);
  }
});

//Update Passengers //////////////////////////////////////////
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

//Delete Passengers //////////////////////////////////////////
app.delete("/api/passengers/:id", (req, res) => {
  PostModelPassengers.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
  });
});

//Get Passengers from Event //////////////////////////////////////////
app.get("/api/event/:eventId/passengers", (req, res) => {
  const { eventId } = req.params;
  const events = PostModelEvent.findById(eventId)
    .populate("passengers")
    .exec((err, events) => {
      console.log("passengers", events.passengers);
      res.send(events.passengers);
    });
});

//Get Car from Event //////////////////////////////////////////
app.get("/api/:eventId/cars", (req, res) => {
  const { eventId } = req.params;
  const events = PostModelEvent.findById(eventId)
    .populate("cars")
    .exec((err, events) => {
      console.log("cars", events.cars);
      res.send(events.cars);
    });
});

//Get Passengers from Car of Event //////////////////////////////////////////
app.get("/api/car/:carId/passengers", (req, res) => {
  const { carId } = req.params;
  const cars = PostModelCar.findById(carId)
    .populate("passengers")
    .exec((err, cars) => {
      console.log("passengers", cars.passengers);
      res.send(cars.passengers);
    });
});

//Add new Car to Event //////////////////////////////////////////
app.post("/api/:id/newcar", async (req, res) => {
  try {
    let { id } = req.params;
    const newVoiture = PostModelCar(req.body);
    console.log("newVoiture", newVoiture);
    const events = await PostModelEvent.findById(id); // Get Event
    await newVoiture.save(); // Save the new Car
    await events.cars.push(newVoiture); // Add car to the Event array 'cars'
    await events.save(); //Save the Event
    res.status(201).json(newVoiture);
  } catch (err) {
    // res.status(err.response.status);
    // return res.send(err.message);
  }
});

//Get Cars from Event //////////////////////////////////////////
app.get("/api/:id/cars", (req, res) => {
  const { eventId } = req.params;
  const events = PostModelEvent.findById(eventId)
    .populate("cars")
    .exec((err, events) => {
      console.log("cars", events.cars);
      res.send(events.cars);
    });
});

//Update Car //////////////////////////////////////////
app.put("/api/car/:id", (req, res) => {
  const postData = req.body;
  PostModelCar.findByIdAndUpdate(req.params.id, postData, (err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
  });
});

//Delete Car //////////////////////////////////////////
app.delete("/api/car/:id", (req, res) => {
  PostModelCar.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
  });
});

app.get("/api/:carId/event", (req, res) => {
  PostModelCar.findById(req.params.id)
    .populate("events")
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

// Sert les fichiers du frontend
app.use(express.static("../Frontend caroster/build"));
app.use((req, res) =>
  res.sendFile(path.join(__dirname, "../Frontend caroster/build/index.html"))
);

app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
