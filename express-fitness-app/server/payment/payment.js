require("dotenv").config()

const express = require("express");
const router = express.Router();
const axios = require('axios')


const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)


  const lessons = async () => {
    return axios.get('http://localhost:5000/lessons').then(res=> res).then(data=> JSON.stringify(data.data))
  }
  // console.log(response.data)
 


// const allLessons = lessons().then(data=> {
//   // console.log(data)
//   const firstLesson = data
// return firstLesson
// })
// console.log(allLessons)
router.post("/payments", async (req,res)=>{
  try {
    const session = await stripe.checkout.sessions.create({
     payment_method_types: ["card"],
     mode : "payment",
     line_items: [

      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
            currency: 'mxn',
            product_data: {
              name: "bench"
            },
            unit_amount: 17500,
           },
        quantity: 1
      }
    ],
    success_url: `${process.env.CLIENT_URL}/success.html`,
    cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    }) 
    console.log({ url: session.url })
    res.json({ url: session.url })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message })
  }
})

module.exports = router 