// Here is where we import modules
const dotenv = require("dotenv")
dotenv.config()
// We begin by loading Express
const express = require("express");
const mongoose = require("mongoose")
const app = express();


//=============== MONGOOSE ===============//
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
  console.group(`connected to MongoDB ${mongoose.connection.name}`)
})

//  Import Model from car.js

const Car = require('./model/car.js')

// ========= MIDDLEWARE ========= /

app.use(express.urlencoded({ extended: false }));
const morgan = require("morgan");

//============ROUTES===========//

app.get('/', async(req, res) => {
    res.render('landingpage.ejs')
})

app.get('/cars', async(req, res) => {
    const allCars = await Car.find();
    res.render("allCars.ejs", {cars: allCars})
})

app.get('/cars/new', async(req, res) => {
    res.render("new.ejs")
})


app.post("/cars", async (req, res) => {
    //  console.log(req.body);
    if (req.body.isElectric === "on") {
        req.body.isElectric = true;
      } else {
        req.body.isElectric = false;
      }
      await Car.create(req.body)
      res.redirect("/cars/new")

    
  });


app.listen(3000, () => {
    console.log("Listening on port 3000");
  });