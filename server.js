const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/meancrud', {useNewUrlParser: true});
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...');
});

app.use(express.json());
app.use(express.static('public'));

//CONTROLLERS
// const todosController= require('./controllers/todos.js');
// app.use('/todos', todosController);


// app.get('/', ( req, res )=>{
//   res.render('index.ejs')
// })

app.listen(port, ()=>{
    console.log('listening on', port);
});
