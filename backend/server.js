require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express();
const allergenRoutes = require('./routes/allergenRoutes');

app.listen(8000, () => {
    console.log("Server Started at port no. 8000");
})

const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.use('/api/allergen', allergenRoutes);

mongoose.connect(uri, {
}).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });