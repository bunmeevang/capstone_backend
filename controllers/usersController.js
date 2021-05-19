const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Car = require('../models/Cars');
const { jsonAuth } = require('./authController')

 router.get('/', (req, res) => {
     const userQuery = User.find({}).select('-password').populate('cars') 
     userQuery.exec((err, foundUsers) => {
         if (err){
             console.log(err);
             res.status(401).json({ msg: err.message });
         } else {
            res.status(200).json(foundUsers) 
         }
     })
  })
 

router.post('/addCarToUser', jsonAuth, (req, res) =>{
    console.log(res.locals)
    const car = req.body
    const addCarQuery = User.findOneAndUpdate({ username: res.locals.user }, { $addToSet: { cars: car._id }}, {new: true})
    addCarQuery.exec((err, updatedUser) => {
        if (err){
            res.status(400).json({
                msg: err.message
            })
        } else {
            res.status(200).json({
                msg: `Updated ${res.locals.user} with ${car.name}`
            })
        }
    })
})

router.post('/addCar/:car/:username', (req, res) =>{
    const carQuery = Car.findOne({ name: req.params.car })
    carQuery.exec(( err, car ) => {
        if(err){
            res.status(400).json({
                msg: err.message
            })
        } else {
            const addCarQuery = User.findOneAndUpdate({ username: req.params.username }, { $addToSet: { cars: car._id }}, {new: true})
            addCarQuery.exec((err, updatedUser) => {
                if(err){
                    res.status(400).json({
                        msg: err.message
                    }) 
                } else {
                    console.log(updatedUser);
                    res.status(200).json({
                        msg: `Updated ${updatedUser.username} with the car ${car.name} `
                    })
                }
            })
        }
    })
})

router.get('/:username', (req, res) => {
    const userQuery = User.findOne({ username: req.params,username }).select('-password').populate('cars')
    
    userQuery.exec((err, foundUser) => {
        if (err) {
            res.status(400).json({
                msg: err.message
            })
        } else {
            res.status(200).json(foundUser)
        }
    })
})

module.exports = router