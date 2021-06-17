const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Import Credentials
require('dotenv/config');

//mongoDB connection string
const url = process.env.DB_CONNECTION

mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>{
    app.listen(3001);
    console.log('database connected!');})
  .catch(err => console.log(err));

// Allowing CORS for Tesing
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", " http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 


// Enabling bodyparser to parse the data from req
app.use(express.json());

//ROUTES ------------------------->

// Home Route
app.get('/', (req, res)=>{
res.send('HOME ROUTE!!!')
});

// Post Routes
const postsRoute = require('./routes/PostRoutes');
app.use('/posts', postsRoute);

// User Routes
const userRoute = require('./routes/UserRoutes');
app.use('/users', userRoute); 

// Auth Routes

const authRoute = require('./routes/authRoutes');
app.use('/auth', authRoute); 


