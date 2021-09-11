const mongoose = require('mongoose')
const Schema = mongoose.Schema
const questionSchema = Schema({
  query: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  tags: [{ type: Schema.Types.ObjectId, ref: 'tag' }],
})

module.exports = mongoose.model('question', questionSchema)
