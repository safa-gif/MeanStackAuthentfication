const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// const db = require('./database/db')
// Express APIs
const user = require('./routes/route')
//connexion to database
mongoose
  .connect("mongodb://127.0.0.1:27017/Users")
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })

// Express settings
const app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
app.use(cors())

// Serve static resources
app.use('/public', express.static('public'))
app.use('/user', user)

// Define PORT
//changement de port pour tester
const port = process.env.PORT || 4300

app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Express error handling
// app.use((next) => {
//   setImmediate(() => {
//     next(new Error('Something went wrong'))
//   })
// })

app.use(function (err, res) {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})
