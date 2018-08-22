//**********************************Dependencies********************************
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/beast_app';

const methodOverride = require('method-override');

const session = require('express-session');

const bcrypt = require('bcrypt');

//***************************Schema Dependencies********************************
const Beasts = require('./models/beasts_model.js');
const User = require('./models/users.js');


//*********************************Middleware***********************************
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'))
app.use(methodOverride('_method'));
app.use(session({
  secret: "hedgehogsandapples", //some random string
  resave: false,
  saveUninitialized: false
}));

//*********************************Controllers**********************************

const beastsController = require('./controllers/beasts.js');
app.use('/beasts', beastsController);

const userController = require('./controllers/users.js')
app.use('/users', userController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

//************************************GET************************************
// REDIRECT TO INDEX
app.get('/',(req,res)=>{
  res.redirect('/beasts')
});

// GET INDEX
app.get('/beasts', (req,res)=>{
  Beasts.find({},(err, allBeasts)=>{
    res.render('index.ejs',{
      currentUser: req.session.currentUser,
      Beasts: allBeasts

    });
  })//.sort({name: 1})
});

// CONNECTIONS
app.listen(port, ()=>{
  console.log('Listening...');
});

mongoose.connect(mongoUri, {useNewUrlParser: true});
mongoose.connection.on('open', ()=>{
  console.log('mongoose!!!!!!!!!!!!!!!!!!!!');
});
