const express = require('express');
const router = express.Router();
const Beasts = require('../models/beasts_model.js')
const Users = require('../models/users.js')

//Create New Route
router.get('/new', async(req, res)=>{
  if (req.session.currentUser) {
      res.render('new.ejs', {
          currentUser: req.session.currentUser
      });
  } else {
      res.send('You must login to create a Creature');
  }
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
        req.body.username = {id: req.session.currentUser._id, username: req.session.currentUser.username}
        Beasts.findByIdAndUpdate(req.params.entryId, {$push: {comments: req.body}}, (err, result) => {
            if (err) {
                console.log('ERR: cannot post comment');

            } else {
                res.redirect('/beasts/' + req.params.entryId)
            }
        })
    }
})



router.get('/:id', (req, res) => {
  let currentUser = null;
  let artist = false;
  let foundFave = false;
  Entries.findById(req.params.entryId, (err, foundBeast) => {
    if (req.session.currentUser) {
      currentUser = req.session.currentUser;
        if (foundBeast.artist === req.session.currentUser._id) {
          artist = true;
          res.render('show.ejs', {
              currentUser: req.session.currentUser,
              currentBeast: foundBeast,
              artist: artist,
              favorite: foundFave,
              moment: moment
          })
        }else {
            res.render('show.ejs', {
                currentUser: req.session.currentUser,
                currentBeast: foundBeast,
                artist: artist,
            })
        }
      }
  })
})
//PUT route to submit the edits
router.put('/:id', async(req, res)=>{
  Beasts.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
      res.redirect('/beasts');
  });
});

module.exports = router;
