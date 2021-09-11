const express = require('express')
const path = require('path')
const apiRouter = require('./Routers/api')
const databaseConnect = require('./database')

const app = express()
databaseConnect()

app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json())

app.use('/api', apiRouter)

//server the react build here
app.get('/', function (req, res) {
  console.log('send file')
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(8000, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('listening on port 8000')
})
