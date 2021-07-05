const { model, Schema } = require('mongoose')

const Exercise = new Schema({
  type: String,
  name: String,
  duration: Number,
  distance: Number,
  weight: Number,
  reps: Number,
  sets: Number
})

module.exports = model('Exercise', Exercise)