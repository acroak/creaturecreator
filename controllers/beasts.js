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
      res.render('notloggedin.ejs',{
        currentUser: req.session.currentUser,
        beasts: Beasts,
        users: Users
      });
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

//get beasts made by current user
router.get('/gallery/mine', (req, res)=>{
    if (req.session.currentUser){
      var user = req.session.currentUser.username
    Beasts.find({artist: user}, (error, myBeasts)=>{
        res.render('./users/gallery.ejs', {
          beasts: myBeasts,
          currentUser: req.session.currentUser,
          user: Users
        });
    });
  } else {
    res.render('notloggedin.ejs',{
      currentUser: req.session.currentUser,
      beasts: Beasts,
      users: Users
    });
  }
});


//Show Route
router.get('/:id', async(req, res)=>{
    Beasts.findById(req.params.id, (err, beast)=>{
        res.render('show.ejs',{
          beast : beast,
          currentUser: req.session.currentUser,
          Users: Users
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
router.post('/:beastId/comment', async(req, res) => {
    if (req.session.currentUser) {
        req.body.username = {id: req.session.currentUser._id, username: req.session.currentUser.username}
        Beasts.findByIdAndUpdate(req.params.beastId, {$push: {comments: req.body}}, (err, result) => {
            if (err) {
                console.log('ERR: cannot post comment');

            } else {
                res.redirect('/beasts/' + req.params.beastId)
            }
        })
    }
})

//Edit Rout
router.get('/:id/edit',(req,res)=>{
  Beasts.findById({_id: req.params.id}, (err, beast)=>{
    res.render('edit.ejs', {
      currentUser: req.session.currentUser,
      beast: beast
    });
  });
});


//PUT route to submit the edits
router.put('/:id', async(req, res)=>{
  Beasts.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
      res.redirect('/beasts');
  });
});




module.exports = router;
