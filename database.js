async function main() {
  const mongoose = require('mongoose')
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/questionBank')
  } catch (err) {
    console.log('error in connecting to mongodb', err)
  }
}

module.exports = main
