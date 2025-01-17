//server.js

const express = require("express");
const cors = require("cors");
const app = express();
const allergenRoutes = require('./routes/allergenRoutes');



app.listen(8000, () => {
    console.log("Server Started at port no. 8000");
})

//Mongoose library instance
const mongoose = require("mongoose");
//URL of MongoDB Database
const mongoDBURL = "mongodb+srv://javascript:hasloJavaScript@cluster0.r0hyt.mongodb.net/";

app.use(cors());
app.use(express.json());

app.use('/api/allergen', allergenRoutes);

//connect to Database
mongoose.connect(mongoDBURL, {
}).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });