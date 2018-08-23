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
            res.render('./users/index.ejs', {
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

//Show
router.get('/:username', (req, res) => {
    User.findOne({ username: req.params.username }, (err, result) => {
        if (req.session.currentUser.username === result.username) {
            res.render('./users/edit.ejs', {
                currentUser: req.session.currentUser,
                user: result,
            })
        } else {
            res.send('access denied')

        }
  })
})

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

//Delete Route
router.delete('/:id', (req, res) => {
  console.log(req.params);
  console.log(req.params.id);
  User.find({ _id: req.params.id}, (err, user)=>{
  
    // but why is it undefines when it eturns the whole user object up above?
  })
  // Beasts.remove({artist: req.params.username})
	// User.remove({_id: req.params.id}, (err, user)=>{
  //   req.session.destroy(() => { })
  //   res.redirect('/')

  // }); //remove the item from the array
});


//Edit by ID, grab info based on id and populate fields
// router.get('/:id/edit', (req, res) => {
//
//     if (req.session.currentUser === user) {
//         User.findOne({ username: req.params.username }, (err, result) => {
//             if (err) {
//                 res.send('Error retrieving user')
//             } else {
//                 res.render('./users/edit.ejs', {
//                     currentUser: result
//                 })
//             }
//         })
//     } else {
//         res.redirect('/');
//     }
// })

//PUT route to submit the edits
// router.put('/:username', (req, res) => {
//     // Check if the logged in user is the artist
//     if (req.session.currentUser.username === req.params.username) {
//         User.findByIdAndUpdate(req.session.currentUser._id, req.body, {new: true}, (err, result) => {
//             console.log('Updated user: ', result);
//             // Update the session
//             req.session.currentUser = result;
//             res.redirect('/users/'+result.username);
//         })
//     } else {
//         res.redirect('/');
//     }
// })



module.exports = router;
