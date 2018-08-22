
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

//Log in New SESSION
router.get('/new', (req, res)=>{
    res.render('sessions/new.ejs', {
      currentUser: req.session.currentUser
    });
});

//Log Off
router.delete('/', (req, res)=>{
    req.session.destroy(() => {
        res.redirect('/beasts')
    })
});

//Check Password
router.post('/', (req, res)=>{
    User.findOne({ username: req.body.username },(err, foundUser) => {
      // console.log(foundUser);
      if (foundUser){
        if( bcrypt.compareSync(req.body.password, foundUser.password) ){
            req.session.currentUser = foundUser;
            res.redirect('/');
        } else {
            res.redirect('/sessions/new');
        }
      } else {
        res.send('User or password not found')
      }

    });
});

module.exports = router;
