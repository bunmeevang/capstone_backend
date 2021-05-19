const express = require('express');
const router = express.Router();
const Car = require('../models/Cars');

// Index
router.get('/', async (req, res) => {
    let filters;
    if(Object.keys(req.query).length > 0){
        filters = {...req.query}
    }
    try {
        if(!filters){
            const foundCars = await Car.find({});
            res.status(200).json(foundCars)
        } else {
            const foundCars = await Car.find({...filters});
            res.status(200).json(foundCars)
        }  
    }catch(error){
        res.status(400).json({
            msg: error.message
        })
    }
})

// Create
router.post('/', async (req, res) => {
    try {
        const createdCar = await Car.create(req.body)
        res.status(200).json(createdCar)
    } catch(err){
        res.status(400).json({
            msg: err.message
        })
    }
})

// Show
router.get('/:id', async (req, res) => {
    try {
        const foundCars = await Car.findById(req.params.id);
        res.status(200).json(foundCars)
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
})

router.get('/byName/:name/', async (req, res) => {
    try {
        const foundCars = await Car.findOne({ name: req.params.name });
        res.status(200).json(foundCars)
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
})

// Update
router.put('/:id', async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true } )
        res.status(200).json(updatedCar);
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
})

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedCar);
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
})

module.exports = router 