const router = require('express').Router()
const { Workout } = require('../models')

// GETS ALL WORKOUTS ALONG WITH THEIR ASSOCIATED EXERCISES
router.get('/workouts', (req, res) => {
  Workout.find()
    .then(workouts => res.json(workouts))
    .catch(err => console.log(err))
})

// GETS A SPECIFIC WORKOUT ALONG WITH ITS ASSOCIATED EXERCISES
router.get('/workouts/:id', (req, res) => {
  Workout.findById(req.params.id)
    .then(workout => res.json(workout))
    .catch(err => console.log(err))
})

// GETS ALL WORKOUTS WITHIN A SPECIFIC RANGE (IN THIS CASE IT IS 7 DAYS)
router.get('/workouts/range', (req, res) => {
  Workout.find({ day: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)), $lte: new Date(new Date().setDate(new Date().getDate())) }})
    .sort({ day: 1 })
    .then(workouts => res.json(workouts))
    .catch(err => console.log(err))
})

// CREATES A NEW WORKOUT
router.post('/workouts', (req, res) => {
  Workout.create(req.body)
    .then(workout => res.json(workout))
    .catch(err => console.log(err))
})

// UPDATES AN EXISTING WORKOUT WITH THE SPECIFIED ID
router.put('/workouts/:id', (req, res) => {
  Workout.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

// DELETES AN EXISTING WORKOUT
router.delete('/workouts/:id', (req, res) => {
  Workout.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})