const express = require('express')
const cors = require("cors");
const helmet = require("helmet")
const studentController = require('./controllers/studentController')
const instructorController = require ('./controllers/instructorsController')
const nutritionistController = require('./controllers/nutritionistController')
const lessonController = require('./controllers/lessonController ')
const paymentController = require('./payment/payment')

const app = express()
app.use(helmet());
app.use(cors({
    origin: "http://127.0.0.1:5500"
}));
app.use(express.json())

//{origin: "http://http://127.0.0.1/:5500"}

app.use('/', paymentController)
app.use('/',studentController);
app.use('/',instructorController);
app.use('/',nutritionistController);
app.use('/', lessonController)
app.use('/', async (req, res)=>{
    res.send('welcome to the fitness app')
})
app.use('/*', (req, res)=>{
    res.send("404 Not Found")
})


const port = process.env.PORT || 5000
app.listen(5000, ()=>{
    console.log(`the server has started on ${port}`)
})
