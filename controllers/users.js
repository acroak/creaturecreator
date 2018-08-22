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
    if (!req.body.img) {
        req.body.img = "http://via.placeholder.com/500x500";
    }
    User.create(req.body, (err, data) => {
        if(!err && data) {
            req.session.currentUser = data;
            res.redirect('/');
        }

    })
})

//Show
// router.get('/:id', async(req, res)=>{
//
//     User.findById(req.params.id, (err, user)=>{
//       if (req.session.currentUser === user){
//
//         res.render('../views/users/show.ejs',{
//           user: user,
//           currentUser: req.session.currentUser,
//         });
//       } else {
//         res.send('access denied')
//       }
//
//
//     });
// });
router.get('/:username', (req, res) => {
    User.findOne({ username: req.params.username }, (err, result) => {
      

        if (req.session.currentUser.username === result.username) {
            res.render('./users/show.ejs', {
                currentUser: req.session.currentUser,
                user: result,
            })
        } else {
            res.send('access denied')

        }
  })
})

//Delete Route
router.delete('/:id', (req, res) => {
    if (req.session.currentUser && (req.session.currentUser.username === req.params.username)) {
        Beasts.remove({artist: req.session.currentUser._id}, (err) => {
            console.log('error removing beasts for user', err);
        })
        User.findByIdAndRemove(req.session.currentUser._id, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Removed user: ', result);
                // Kill the session
                req.session.destroy(() => { })
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
})


//Edit by ID, grab info based on id and populate fields
router.get('/:id/edit', (req, res) => {

    if (req.session.currentUser === user) {
        User.findOne({ username: req.params.username }, (err, result) => {
            if (err) {
                res.send('Error retrieving user')
            } else {
                res.render('./users/edit.ejs', {
                    currentUser: result
                })
            }
        })
    } else {
        res.redirect('/');
    }
})

//PUT route to submit the edits
router.put('/:username', (req, res) => {
    // Check if the logged in user is the artist
    if (req.session.currentUser.username === req.params.username) {
        User.findByIdAndUpdate(req.session.currentUser._id, req.body, {new: true}, (err, result) => {
            console.log('Updated user: ', result);
            // Update the session
            req.session.currentUser = result;
            res.redirect('/users/'+result.username);
        })
    } else {
        res.redirect('/');
    }
})



module.exports = router;
