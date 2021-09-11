const express = require('express')
const { addQuestion, getQuestion } = require('../controllers/questions')
const Router = express.Router()

Router.post('/add-question', addQuestion)
Router.post('/get-question', getQuestion)

module.exports = Router
