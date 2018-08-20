const express = require('express');
const router = express.Router();
const Beast = require('../models/beasts_model.js')

//Create New Route
router.get('/new', (req, res)=>{
    res.render('new.ejs');
});

//Create Route
router.post('/', (req, res)=>{
    Beast.create(req.body, (error, createdBeast)=>{
      res.redirect('/beasts')
    });
});

//Index Route (find all beasts)
router.get('/', (req, res)=>{
    Beast.find({}, (error, allBeasts)=>{
        res.render('index.ejs', {
            beasts: allBeasts
        });
    });
});

//Show Route
router.get('/:id', (req, res)=>{
    Beast.findById(req.params.id, (err, beast)=>{
        res.render('show.ejs',{
          beast : beast
        });
    });
});

//Delete Route
router.delete('/:id', (req, res)=>{
  Beast.findByIdAndRemove(req.params.id, (err, data)=>{
   res.redirect('/beasts');//redirect back to beasts index
  });
});

//Edit by ID, grab info based on id and populate fields
router.get('/:id/edit', (req, res)=>{
    Beast.findById(req.params.id, (err, foundBeast)=>{ //find the beast
        res.render(
    		'edit.ejs',
    		{
    			beast: foundBeast //pass in found beast
    		}
    	);
    });
});

//PUT route to submit the edits
router.put('/:id', (req, res)=>{
  Beast.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
      res.redirect('/beasts');
  });
});

module.exports = router;
