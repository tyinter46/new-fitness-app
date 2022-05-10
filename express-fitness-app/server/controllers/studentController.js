const express = require("express");
const router = express.Router();
const pool = require("../db");


//get all students
router.get("/students", async (req, res) => {
  try {
    const students = await pool.query("SELECT * from students");
    return res.send(students.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get one student by id
router.get("/students/:id", async (req, res) => {
  const { id } = req.params;
  const student = await pool.query("SELECT * FROM students WHERE students_id = $1", [id])
  res.send(student.rows[0])
 });

// create one student
router.post("/students", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      password,
      confirmPassword,
      email,
      phone,
      gender,
      date_of_birth,
    } = req.body;
  
      const newStudent = await pool.query(
        "INSERT INTO students (first_name,  last_name, password, email, phone, gender , date_of_birth) VALUES( $1, $2, $3, $4, $5, $6, $7) RETURNING * ",
        [first_name, last_name, password, email, phone, gender, date_of_birth]
      );

      if (res.statusCode === 200)       res.send("Student details posted successfully");
     } catch (error) {
    // res.json(error.message);
    console.log(error.message);
  }
});

//delete one student
router.delete("/students/:id", async (req, res) => {
  try {
  const { id } = req.params
  const idExist = await pool.query("SELECT EXISTS (SELECT * FROM students WHERE students_id = $1)", [id]); 
  //console.log(idExist.rows[0].exists)
 if (!idExist.rows[0].exists) throw new Error ("student not available")  
 const deleteStudent = await pool.query("DELETE FROM students WHERE students_id = $1 RETURNING *", [id])
  if (res.statusCode == 200) res.send('Student Deleted Successfully')
     } catch (error) {
  res.send(error.message)
  console.log(error.message)
 }
});

//update one student
router.put("/students/:id", async (req, res) => {
  try {
  
  const { id } = req.params;
  const {
    first_name,
    last_name,
    email,
    phone,
    gender,
    date_of_birth
  } = req.body
  const updateTeacher = await pool.query("UPDATE students SET  first_name = $1,   last_name = $2, email = $3, phone = $4, gender = $5, date_of_birth = $6 WHERE students_id = $7 RETURNING *", 
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
}});

module.exports = router;
