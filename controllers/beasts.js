const express = require('express');
const router = express.Router();
const Beasts = require('../models/beasts_model.js')

//Create New Route
router.get('/new', async(req, res)=>{
    res.render('new.ejs',{
      currentUser: req.session.currentUser,
      Beasts : Beasts
    });
});

//Create Route
router.post('/', async(req, res)=>{
    Beasts.create(req.body, (error, createdBeast)=>{
      res.redirect('/beasts')
    });
});

//Index Route (find all beasts)
router.get('/', async(req, res)=>{
    Beasts.find({}, (error, allBeasts)=>{
        res.render('index.ejs', {
            beasts: allBeasts,
            currentUser: req.session.currentUser
        });
    });
});

router.get('/all', async(req, res)=>{
    Beasts.find({}, (error, allBeasts)=>{
        res.send(req.body);
    });
});

//Show Route
router.get('/:id', async(req, res)=>{
    Beasts.findById(req.params.id, (err, beast)=>{
        res.render('show.ejs',{
          beast : beast,
          currentUser: req.session.currentUser
        });
    });
});

//Delete Route
router.delete('/:id', async(req, res)=>{
  Beasts.findByIdAndRemove(req.params.id, (err, data)=>{
   res.redirect('/beasts');//redirect back to beasts index
  });
});

//POST for Comments
router.post('/:entryId/comment', async(req, res) => {
    if (req.session.currentUser) {
        // format the comment object
        req.body.date = new Date();
        req.body.username = {id: req.session.currentUser._id, username: req.session.currentUser.username}
        // Push it onto the entries comment property
        Beasts.findByIdAndUpdate(req.params.entryId, {$push: {comments: req.body}}, (err, result) => {
            if (err) {
                console.log('Error trying to update comment');

            } else {
                res.redirect('/beasts/' + req.params.entryId)
            }
        })
    }
})


//Edit by ID, grab info based on id and populate fields
router.get('/:id/edit', async(req, res)=>{
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
router.put('/:id', async(req, res)=>{
  Beasts.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
      res.redirect('/beasts');
  });
});

module.exports = router;
