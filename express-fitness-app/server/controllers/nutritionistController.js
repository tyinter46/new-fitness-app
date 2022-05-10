const express = require("express");
const router = express.Router();
const pool = require("../db");


//get all nutritionist
router.get("/nutritionist", async (req, res) => {
  try {
    const nutritionist = await pool.query("SELECT * from nutritionist");
    return res.send(nutritionist.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get one nutritionist by id
router.get("/nutritionist/:id", async (req, res) => {
  const { id } = req.params;
  const nutritionist = await pool.query("SELECT * FROM nutritionist WHERE nutritionist_id = $1", [id])
  res.send(nutritionist.rows[0])
 });

// create one nutritionist
router.post("/nutritionist", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      password,
      confirmPassword,
      email,
      phone,
      gender,
      date_of_birth
    } = req.body;
  
      const newInstructor = await pool.query(
        "INSERT INTO nutritionist (first_name,  last_name, password, email, phone, gender , date_of_birth) VALUES( $1, $2, $3, $4, $5, $6, $7) RETURNING * ",
        [first_name, last_name, password, email, phone, gender, date_of_birth]
      );

      if (res.statusCode === 200)       res.send("nutritionist details posted successfully");
     } catch (error) {
    // res.json(error.message);
    console.log(error.message);
  }
});

//delete one nutritionist
router.delete("/nutritionist/:id", async (req, res) => {
  try {
  const { id } = req.params
  const idExist = await pool.query("SELECT EXISTS (SELECT * FROM nutritionist WHERE nutritionist_id = $1)", [id]); 
  //console.log(idExist.rows[0].exists)
 if (!idExist.rows[0].exists) throw new Error ("nutritionist not available")  
 const deleteNutritionist = await pool.query("DELETE FROM nutritionist WHERE nutritionist_id = $1 RETURNING *", [id])
  if (res.statusCode == 200) res.send('Instructor Deleted Successfully')
     } catch (error) {
  res.send(error.message)
  console.log(error.message)
 }
});

//update one nutritionist
router.put("/nutritionist/:id", async (req, res) => {
  try{
  const { id } = req.params;
  const idExist = await pool.query("SELECT EXISTS (SELECT * FROM nutritionist WHERE nutritionist_id = $1)", [id]); 
 console.log(idExist.rows[0].exists)
 if (!idExist.rows[0].exists) throw new Error ("nutritionist not available")  
  const {
    first_name,
    last_name,
    email,
    phone,
    gender,
    date_of_birth
  } = req.body
  const updateInstructor = await pool.query("UPDATE nutritionist SET  first_name = $1,   last_name = $2, email = $3, phone = $4, gender = $5, date_of_birth = $6 WHERE nutritionist_id = $7 RETURNING *", 
  [ 
    first_name,
    last_name,
    email,
    phone,
    gender,
    date_of_birth,
    id  ] ) 
  res.send(`${id} updated`);
  } catch (error) {
      res.send(error.message)
  }

});

module.exports = router;
