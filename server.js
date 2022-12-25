require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('err', (error) => {console.error(error);});
db.once('open', () => {console.log('Connected to DB');})

app.use(express.json())

const linksRouter = require('./routes/links.js')
app.use('/links', linksRouter)

app.listen(3000, () => console.log("Server is up"))
console.log("DB state = " + db.readyState)



