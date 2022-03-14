const express = require('express')
const db = require('./db')




const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// api 
const users = require('./routes/users')
const objects = require('./routes/objects')

// utilisation des route api
app.use(users)
app.use(objects)

module.exports = {
    path: '/api',
    handler: app
  }
  