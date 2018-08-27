const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const Beasts = require('../models/beasts_model.js')
const bcrypt = require('bcrypt');


//get user index
router.get('/', (req, res) => {
    // Get the latest beasts
    User.find({}, (err, result) => {
        if (!err && result) {
            res.render('notloggedin.ejs', {
                currentUser: req.session.currentUser,
                userBeasts: result
            })
        }
    })
})

//create new user route
router.get('/new', (req, res)=>{
    res.render('users/new.ejs',{
      currentUser: req.session.currentUser,
    });

});

//encrpt password, redirect home
router.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
      User.create(req.body, (err, data) => {
          if(!err && data) {
              req.session.currentUser = data;
              res.redirect('/');
          }
      })
})

// Show
// router.get('/:username', (req, res) => {
//     User.findOne({ username: req.params.username }, (err, result) => {
//         if (req.session.currentUser.username === result.username) {
//             res.render('./users/edit.ejs', {
//                 currentUser: req.session.currentUser,
//                 user: result,
//             })
//         } else {
//             res.render('access denied')
//
//         }
//   })
// })


router.put('/:username', (req, res)=>{
    User.findByIdAndUpdate(req.params.id, req.body,  (err, updatedModel)=>{
          res.redirect('/');
      });
});

//Delete Route
router.delete('/:username', (req, res) => {

  Beasts.remove({artist: req.session.currentUser.username}, (err)=>{
    console.log('error removing users created beasts', err);
  })
	User.remove({username: req.session.currentUser.username}, (err, user)=>{
    req.session.destroy(() => { })
    res.redirect('/')
  });
});

router.get('/:username/gallery', (req, res)=>{
  console.log('hello');
  console.log(req.params.username);
  User.findOne({ username: req.params.username }, (err, user) => {
    Beasts.find({artist: req.params.username}, (err, beasts)=>{
      res.render('./users/gallery.ejs', {
          currentUser: req.session.currentUser,
          user: user,
          beasts: beasts
      })
    })
  })
})
//Edit
router.get('/:id/edit',(req,res)=>{
  User.findOne({ username: req.session.currentUser.username }, (err, result) => {
    if (req.session.currentUser.username === result.username) {
      User.findById({username: req.session.currentUser.username}, (err, user)=>{
        res.render('./users/edit.ejs', {
          currentUser: req.session.currentUser,
          user: user
        });
      });
    } else {
      res.redirect('/')
    }
  })


});




router.put('/:id', (req, res)=>{
    // Beasts.find({artist: currentUser.username})
    User.findByIdAndUpdate(req.session.currentUser.username, req.body,  (err, updatedModel)=>{
          res.redirect('/');
      });
});

module.exports = router;
