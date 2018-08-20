const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
// const Beast = require('./models/beasts_model.js')




app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/basiccrud');
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

const beastsController = require('./controllers/beasts_controller.js');
app.use('/beasts', beastsController);


app.listen(3000, ()=>{
  console.log('listening on 3000');
})
