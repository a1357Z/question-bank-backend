const QuestionSchema = require('../models/question')
const TagSchema = require('../models/tag')
const Joi = require('joi')

module.exports.addQuestion = async (req, res) => {
  const { query, topic, tags } = req.body
  console.log('req.body', req.body)

  const validation = Joi.object({
    query: Joi.string().required(),
    topic: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
  })

  const { error, value } = validation.validate(req.body)

  if (error) {
    throw error
  }

  try {
    const tagObjectsArray = tags.map((tag) => {
      return {
        tag,
      }
    })

    let tagIds = []
    console.log('tagObjectsArrayBefore', tagObjectsArray)

    //filtering out the already existing tags from tagObjectsArray
    for (let i = 0; i < tagObjectsArray.length; i++) {
      let tag = await TagSchema.findOne(tagObjectsArray[i])
      if (tag) {
        console.log('splicing tag', tag)
        await tagObjectsArray.splice(i, 1)
        i--
        tagIds.push(tag._id)
      }
    }
    console.log('tagObjectsArrayAfter', tagObjectsArray)

    //creating new tags and adding their ids to tagIds
    const tagsCreated = await TagSchema.insertMany(tagObjectsArray)
    console.log('tagsCreated', tagsCreated)
    tagsCreated.forEach((tag) => {
      tagIds.push(tag._id)
    })
    console.log('tagsIds', tagIds)

    //creating the question
    const question = await QuestionSchema.create({ query, topic, tags: tagIds })
    console.log('question', question)
    res.json({ message: 'successfully created the question' })
  } catch (error) {
    console.log('error in creation', error)
    throw error
  }
}

module.exports.getQuestion = async (req, res) => {
  const { searchText } = req.body

  const validation = Joi.object({
    searchText: Joi.string().required(),
  })

  const { error, value } = validation.validate(req.body)
  console.log('error', error, 'value', value)
  if (error) {
    throw error
  }

  try {
    //finding a tag using the searchtext and all the associated questions with that tag
    const tag = await TagSchema.findOne({ tag: searchText })
    if (tag) {
      console.log('tag', tag)
      const { _id } = tag
      let questions = await QuestionSchema.find({ tags: _id })
      console.log('questions', questions)
      questions = questions.map((question) => question.query)
      return res.json({ data: { questions } })
    }

    //finding a question using the searchtext
    const question = await QuestionSchema.findOne({ query: searchText })
    if (question) {
      return res.json({ data: { questions: [question.query] } })
    }

    return res.json({ data: null })
  } catch (error) {
    throw error
  }
}
