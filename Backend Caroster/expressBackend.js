const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const secret = "mysecretcaroster";
const saltRounds = 10;
const nodemailer = require("nodemailer");

const MONGO_URL = process.env.MONGO_URL || "localhost";
mongoose.connect(`mongodb://${MONGO_URL}/caroster`, {
  useNewUrlParser: true
});

mongoose.connection.on("connected", err => {
  if (err) throw err;
  console.log("Connected to Database");
});
mongoose.set("useCreateIndex", true);

const PostSchemaEvent = mongoose.Schema({
  title: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "car" }],
  passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: "passengers" }]
});

const PostModelEvent = mongoose.model("event", PostSchemaEvent, "event");

const PostShemaCar = mongoose.Schema({
  carName: String,
  seats: Number,
  contact: String,
  email: String,
  message: String,
  address: String,
  date: String,
  time: String,
  passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: "passengers" }]
});

const PostModelCar = mongoose.model("car", PostShemaCar, "car");

const PostShemaPassengers = mongoose.Schema({
  name: { type: String, required: true }
});

const PostModelPassengers = mongoose.model(
  "passengers",
  PostShemaPassengers,
  "passengers"
);

const PostSchemaUser = mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  event: [{ type: mongoose.Schema.Types.ObjectId, ref: "event" }]
});

PostSchemaUser.pre("save", function(next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    bcrypt.hash(document.password, saltRounds, function(err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

PostSchemaUser.methods.isCorrectPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

const PostModelUser = mongoose.model("user", PostSchemaUser, "user");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

mongoose.set("useFindAndModify", false);
const PORT = 3000;

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.set("trust proxy", ["loopback", "linklocal", "uniquelocal"]);

////USER LOGIN///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/api/register", function(req, res) {
  const { name, contact, email, password } = req.body;
  const user = PostModelUser({ name, contact, email, password });
  user.save(function(err, result) {
    if (err) {
      res.status(500).send("Error registering new user please try again.");
    } else {
      res.status(200).json(user);
    }
  });
});

app.post("/api/authenticate", function(req, res) {
  const { email, password } = req.body;
  const redirectURL = req.secure
    ? `https://${req.hostname}`
    : `http://${req.hostname}`;
  const user = PostModelUser.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again"
      });
    } else if (!user) {
      res.redirect(`${redirectURL}/NewEvent`);
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again"
          });
        } else if (!same) {
          res.redirect(`${redirectURL}/NewEvent`);
        } else {
          res.status(200).json(user);
        }
      });
    }
  });
});

// const withAuth = function(req, res, next) {
//   const token =
//     req.body.token ||
//     req.query.token ||
//     req.headers["x-access-token"] ||
//     req.cookies.token;
//   if (!token) {
//     res.status(401).send("Unauthorized: No token provided");
//   } else {
//     jwt.verify(token, secret, function(err, decoded) {
//       if (err) {
//         res.status(401).send("Unauthorized: Invalid token");
//       } else {
//         req.email = decoded.email;
//         next();
//       }
//     });
//   }
// };
//
// app.get("/checkToken", withAuth, function(req, res) {
//   res.sendStatus(200);
// });

app.put("/api/user/:id", (req, res) => {
  const postData = req.body;
  PostModelUser.findByIdAndUpdate(req.params.id, postData, (err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
  });
});

app.get("/api/user/:id", (req, res) => {
  let id = req.params.id;
  PostModelUser.findById(id).then(doc => {
    if (!doc) {
      return res.status(404).end();
    }
    return res.status(200).json(doc);
  });
});

app.delete("/api/user/:id", (req, res) => {
  PostModelUser.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
  });
});

app.put("/api/user/password/update/:id", (req, res) => {
  const newPassword = req.body.password;
  //const user = PostModelUser(newPassword);

  bcrypt.hash(newPassword, saltRounds, function(err, hashedPassword) {
    if (err) {
      next(err);
    } else {
      console.log(req.params.id);
      PostModelUser.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { password: hashedPassword } }
      );

      res.send(hashedPassword);
    }
  });
});

app.post("/api/:id/userEvent", async (req, res) => {
  try {
    let { id } = req.params;
    const newEvent = PostModelEvent(req.body);
    console.log("newEvent", newEvent);
    const user = await PostModelUser.findById(id);
    await newEvent.save();
    await user.event.push(newEvent);
    await user.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(err.response.status);
    return res.send(err.message);
  }
});

app.get("/api/user/:userId/userEvent", (req, res) => {
  const { userId } = req.params;
  const users = PostModelUser.findById(userId)
    .populate("event")
    .exec((err, users) => {
      console.log("event", users.event);
      res.send(users.event);
    });
});

//Add  Event //////////////////////////////////////////
app.post("/api/event", async (req, res) => {
  const newPost = PostModelEvent(req.body);
  const event = await newPost.save().catch(err => {
    res.status(422).json({
      status: 422,
      message: "Invalid title/email. Make sure Fields are not empty"
    });
  });
  let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 465,
    secure: true, // true for 465, false for other ports,
    auth: {
      user: "apikey",
      pass:
        "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"
    }
  });

  // send mail with defined transport object
  let pathname = req.get("origin");
  let info = await transporter.sendMail({
    from: '"Caroster" <caroster@goodguys.com>', // sender address
    to: `${req.body.email}`, // list of receivers
    subject: `Votre lien Caroster pour votre événement : "${req.body.title}"`, // Subject line
    html: `
        <p>Voici le lien à partager avec les personnes venant à votre événement : "${pathname}/event/${event._id}
    "
    </p>`
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  res.status(200).json(event);
});

// Get Event //////////////////////////////////////////
// app.get("/api/event", (req, res) => {
//   PostModelEvent.find((err, result) => {
//     if (err) res.send({ success: false, msg: err });

//     res.send({ success: true, result: result });
//   });
// });

//Get Event by ID //////////////////////////////////////////
app.get("/api/event/:id", (req, res, next) => {
  let id = req.params.id;
  PostModelEvent.findById(id)
    .populate("cars")
    .then(doc => {
      if (!doc) {
        return res
          .status(404)
          .json({ status: 404, message: "Event not found" });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "sucessful operation", doc });
      }
      return next();
    })
    .catch(next);
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
  let { id } = req.params;
  const newPassengers = PostModelPassengers(req.body);
  if (!req.body.name) {
    res.status(422).json({ errors: { message: "your name cannot be empty" } });
  }
  console.log("newPassengers", newPassengers);
  const car = await PostModelCar.findById(id); // Get Car
  await newPassengers.save(); //Save the Passenger
  await car.passengers.push(newPassengers); // Add Passenger to the Event array 'cars'
  await car.save(); //Save the Car
  console.log("passengers", newPassengers);
  let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 465,
    secure: true, // true for 465, false for other ports,
    auth: {
      user: "apikey",
      pass:
        "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"
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Caroster" <caroster@goodguys.com>', // sender address
    to: `${car.email}`, // list of receivers
    subject: `Nouveau passager `, // Subject line
    html: `
        <p>Bonjour,</p>
        <br />
        <p>Vous avez un nouveau passager dans votre voiture "${car.carName}" pour l'événement "".</p>
        <p>"<strong>${newPassengers.name}</strong>"</p>
      ` // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res
    .status(200)
    .json({ status: 200, message: "sucessful operation", newPassengers });
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

//Get Event by ID //////////////////////////////////////////
app.get("/api/passengers/:id", (req, res) => {
  let id = req.params.id;
  PostModelPassengers.findById(id).then(doc => {
    if (!doc) {
      return res.status(404).end();
    }
    return res.status(200).json(doc);
  });
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
    const newCar = PostModelCar(req.body);
    console.log("newCar", newCar);
    const events = await PostModelEvent.findById(id); // Get Event
    await newCar.save(); // Save the new Car
    await events.cars.push(newCar); // Add car to the Event array 'cars'
    await events.save(); //Save the Event
    res.status(201).json(newCar);
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

//Get Cars By Id //////////////////////////////////////////
app.get("/api/car/:id", (req, res) => {
  PostModelCar.findById(req.params.id, (err, result) => {
    if (err) res.send({ success: false, msg: err });
    res.send({ success: true, result: result });
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

// Sert les fichiers du frontend
app.use(express.static("../Frontend caroster/build"));
app.use((req, res) =>
  res.sendFile(path.join(__dirname, "../Frontend caroster/build/index.html"))
);

app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
