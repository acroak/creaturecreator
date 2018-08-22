const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.get('/new', (req, res)=>{
    res.render('users/new.ejs');
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
router.get('/:id', async(req, res)=>{
    User.findById(req.params.id, (err, user)=>{
        res.render('../views/users/show.ejs',{
          user: user,
          currentUser: req.session.currentUser,
        });

    });
});

//Delete Route
router.delete('/:id', async(req, res)=>{
  User.findByIdAndRemove(req.params.id, (err, data)=>{
   res.redirect('/beasts');//redirect back to beasts index
  });
});


//Edit by ID, grab info based on id and populate fields
router.get('/:id/edit', async(req, res)=>{
    User.findById(req.params.id, (err, foundUSer)=>{ //find the beast
        res.render(
    		'edit.ejs',
    		{
    			user: foundUser, //pass in found beast
          currentUser: req.session.currentUser
    		}
    	);
    });
});

//PUT route to submit the edits
router.put('/:id', async(req, res)=>{
  User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
      res.redirect('/beasts');
  });
});



module.exports = router;
