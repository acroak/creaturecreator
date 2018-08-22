const express = require('express');
const router = express.Router();
const Beasts = require('../models/beasts_model.js')

//Create New Route
router.get('/new', (req, res)=>{
    res.render('new.ejs',{
      currentUser: req.session.currentUser,
      Beasts : Beasts
    });
});

//Create Route
router.post('/', (req, res)=>{
    Beasts.create(req.body, (error, createdBeast)=>{
      res.redirect('/beasts')
    });
});

//Index Route (find all beasts)
router.get('/', (req, res)=>{
    Beasts.find({}, (error, allBeasts)=>{
        res.render('index.ejs', {
            beasts: allBeasts,
            currentUser: req.session.currentUser
        });
    });
});

router.get('/all', (req, res)=>{
    Beasts.find({}, (error, allBeasts)=>{
        res.send(req.body);
    });
});

//Show Route
router.get('/:id', (req, res)=>{
    Beasts.findById(req.params.id, (err, beast)=>{
        res.render('show.ejs',{
          beast : beast,
          currentUser: req.session.currentUser
        });
    });
});

//Delete Route
router.delete('/:id', (req, res)=>{
  Beasts.findByIdAndRemove(req.params.id, (err, data)=>{
   res.redirect('/beasts');//redirect back to beasts index
  });
});

//Edit by ID, grab info based on id and populate fields
router.get('/:id/edit', (req, res)=>{
    Beasts.findById(req.params.id, (err, foundBeast)=>{ //find the beast
        res.render(
    		'edit.ejs',
    		{
    			beast: foundBeast, //pass in found beast
          currentUser: req.session.currentUser
    		}
    	);
    });
});

//PUT route to submit the edits
router.put('/:id', (req, res)=>{
  Beasts.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
      res.redirect('/beasts');
  });
});

module.exports = router;
