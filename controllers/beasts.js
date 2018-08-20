const express = require('express')
const router = express.Router()
const {Beast} = require('../models/beasts.js')
// const {User} = require('../models/beasts.js')

//get
router.get('/', (req, res) => {
  Beast.find({}, (err, foundBeast) => {
    res.json(foundBeast)
  })
})

//create
router.post('/', (req, res) => {
  console.log('Creature Created');
  Beast.create(req.body, (err, createdBeast) => {
    res.json(createdBeast)
  })
})

// delete
router.delete('/:id', (req, res)=>{
  Beast.findByIdAndRemove(req.params.id, (err, deletedBeast)=>{
    res.json(deletedBeast)
  })
})


// update
router.put('/:id', (req, res)=>{
  Beast.findByIdAndUpdate(req.params.id, req.body, {return: true}, (err, updatedBeast)=>{
    res.json(updatedBeast)
  })

})

// router.put('/:id/like', (req, res)=>{
//   Beast.findById(req.params.id, (err, foundBeast)=>{
//     console.log(foundBeast)
//     let beast = foundBeast;
//     User.findByIdAndUpdate( req.session.currentUser._id, {$pull: {beasts: beast}}, (err, updatedPullUser)=>{
//       User.findByIdAndUpdate( req.session.currentUser._id, {$push: {beasts: beast}}, (err, updatedPushUser)=>{
//         console.log(updatedPullUser)
//         console.log('---------------break---------------');
//         console.log(updatedPushUser)
//         res.json(updatedPushUser)
//       })
//     })
//   });
// });
//
//
// router.put('/:id/dislike', (req, res)=>{
//   Beast.findById(req.params.id, (err, foundBeast)=>{
//     console.log(foundBeast)
//     let beast = foundBeast;
//     User.findByIdAndUpdate( req.session.currentUser._id, {$pull: {beasts: beast}}, {return: true}, (err, updatedUser)=>{
//       res.json(updatedUser)
//       console.log(updatedUser)
//     })
//   })
// })




module.exports = router
