const { model, Schema } = require('mongoose')

const Workout = new Schema({
  day: Date,
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Exercise'
    }
  ]
})

module.exports = model('Workout', Workout)