require("dotenv").config()

const express = require("express");
const router = express.Router();
const axios = require('axios');
const { json } = require("express");


const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)


 
  // console.log(response.data)
 //fetch all the classes from the database and save it to a variable 
  const allClasses = (async() => {
    const lessons = async () => {
          
       try {
      classes =  axios.get('http://localhost:5000/lessons').then(res=> res).then(data=> {return data.data})
       } catch (error) {
         console.log(error.message)
       }
       return classes
    }
  let allLessons = await lessons()
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
              name: allLessons[0].name
            },
            unit_amount: allLessons[0].price,
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

})();
module.exports = router 