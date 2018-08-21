const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.get('/new', (req, res)=>{
    res.render('users/new.ejs');
});

//encrpt password, redirect home
router.post('/', (req, res)=>{
    User.findOne({ username: req.body.username },(err, foundUser) => {
      console.log(foundUser);
        if( bcrypt.compareSync(req.body.password, foundUser.password) ){
            req.session.currentUser = foundUser;
            res.redirect('/');
        } else {
            res.send('wrong password');
        }
    });
});
module.exports = router;
