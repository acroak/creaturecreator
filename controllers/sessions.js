const express = require('express');
const router = express.Router();
const {User} = require('../models/beasts.js');
const bcrypt = require('bcryptjs');

//Login /POST
router.post('/',(req,res)=>{
  console.log('logging in...');
  User.findOne({username:req.body.username}, (err, foundUser)=>{
    //If the username was not found, send an error message
    if(foundUser === null){
      res.status(403).json({
        status: 403,
        message: "Username not found"
      })
    }
      //If the username was found
    else if (bcrypt.compareSync(req.body.password, foundUser.password)){
      req.session.currentUser = foundUser;
      res.status(201).json({
        status:201,
        message: "Session created",
        user: foundUser
      });
    } else {
      res.status(401).json({
        status:401,
        message:"Login failed"
      });
    }
  })
})


//Logout / DELETE
router.delete('/', (req,res)=>{
  console.log('logging out...');
  req.session.destroy(()=>{
    res.status(200).json({
      status: 200,
      message: "Logout complete"
    });
  })
});

module.exports = router;
