const mongoose = require('mongoose')
const Schema = mongoose.Schema
const tagSchema = Schema({
  tag: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('tag', tagSchema)
