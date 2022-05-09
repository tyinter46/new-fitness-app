const express = require('express')
const cors = require("cors");
const helmet = require("helmet")
const studentController = require('./controllers/studentController')
const instructorController = require ('./controllers/instructorsController')


const app = express()
// app.use(helmet());
app.use(cors());
app.use(express.json())




app.use('/',studentController);
app.use('/',instructorController);
app.use('/', async (req, res)=>{
    res.send('welcome to the fitness app')
})



const port = process.env.PORT || 5000
app.listen(5000, ()=>{
    console.log(`the server has started on ${port}`)
})
