const express = require('express');
const app = express();
const mongoose = require('mongoose')
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/creature_creator';
 mongoose.connect(mongoUri);
 const session = require('express-session');
 const bcryptjs = require('bcryptjs')


 // JSON middleware
 app.use(express.json());

 // Public middleware
 app.use(express.static("public"));


 // Session middleware
 app.use(session({
     secret:'feedmeseymour',
     resave: false,
     saveUninitialized: false
 }));

 /// req.body middleware
 app.use(express.urlencoded({extended:false}));

 // controllers

 // beasts controller
 const beastsController = require('./controllers/beasts.js');
 app.use('/beasts', beastsController);

 //users controller
 const usersController = require('./controllers/users.js');
 app.use('/users', usersController);

 //sessions controller
 const sessionsController = require('./controllers/sessions.js');
 app.use('/sessions', sessionsController);

 const port = process.env.PORT || 3000;
 app.listen(port);
 console.log('---------------------------------');
 console.log('Server running on port: ' + port);
 console.log('---------------------------------');
