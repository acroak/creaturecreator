const express = require('express')
const router = express.Router()

const Beasts= require('../models/beasts.js');



//get create page
router.get('/new', (req, res)=>{
    res.render('new.ejs');
});

//Create
router.post('/beasts/', (req, res)=>{
  Beast.create(req.body, (error, createdBeast)=>{
      res.send(createdBeast);
  });
});

//INDEX
router.get('/beasts', (req, res)=>{
    res.send('index');
});

// //get all beasts
// router.get('/', (req, res) => {
//   Beast.find({}, (err, foundBeast) => {
//     res.json(foundBeast)
//   })
// })
//
// //create
// router.post('/', (req, res) => {
//   console.log('Creature Created');
//   Beast.create(req.body, (err, createdBeast) => {
//     res.json(createdBeast)
//   })
// })
//
// // delete
// router.delete('/:id', (req, res)=>{
//   Beast.findByIdAndRemove(req.params.id, (err, deletedBeast)=>{
//     res.json(deletedBeast)
//   })
// })
//
//
// // update
// router.put('/:id', (req, res)=>{
//   Beast.findByIdAndUpdate(req.params.id, req.body, {return: true}, (err, updatedBeast)=>{
//     res.json(updatedBeast)
//   })
//
// })






module.exports = router
