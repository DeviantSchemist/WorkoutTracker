const router = require('express').Router()
const { Workout } = require('../models')

// GETS ALL WORKOUTS
router.get('/workouts', (req, res) => {
  Workout.find()
    .then(workouts => res.json(workouts))
    .catch(err => console.log(err))
})

// GETS ALL WORKOUTS WITHIN A SPECIFIC RANGE (IN THIS CASE IT IS 7 DAYS)
router.get('/workouts/range', (req, res) => {
  Workout.aggregate(
    [
      { $match: { day: { $gte: new Date(new Date().setDate(new Date().getDate() - 8)), $lte: new Date(new Date().setDate(new Date().getDate())) } } },
      { $sort: { day: 1 } },
      { $addFields: { totalDuration: { $sum: '$exercises.duration' } } }
    ]
  )
  .then(workouts => res.json(workouts))
  .catch(err => console.log(err))
})

// CREATES A NEW WORKOUT
router.post('/workouts', (req, res) => {
  Workout.create(req.body)
    .then(workout => res.json(workout))
    .catch(err => console.log(err))
})

// ADDS AN EXERCISE TO AN EXISTING WORKOUT
router.put('/workouts/:id', (req, res) => {
  Workout.findOne({ _id: req.params.id })
    .then(workout => {
      workout.exercises.push(req.body)
      workout.save()
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router