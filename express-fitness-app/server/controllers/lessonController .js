const express = require("express");
const router = express.Router();
const pool = require("../db");


//get all lessons
router.get("/lessons", async (req, res) => {
  try {
    const lessons = await pool.query("SELECT * from lessons");
    return res.send(lessons.rows);
  } catch (error) {
    console.log(error.message);
  }
});



//get one lesson by id
router.get("/lessons/:id", async (req, res) => {
  const { id } = req.params;
  const idExist = await pool.query("SELECT EXISTS (SELECT * FROM lessons WHERE lessons_id = $1)", [id]); 
  //console.log(idExist.rows[0].exists)
 if (!idExist.rows[0].exists) throw new Error ("lesson not available")  
  const lesson = await pool.query("SELECT * FROM lessons WHERE lessons_id = $1", [id])
  res.send(lesson.rows[0])
 });

// create one lesson
router.post("/lessons", async (req, res) => {
  try {
    const {
      lesson_name,
      price,
      description,
      unit,
      expiry_date
         } = req.body;
  
      const newInstructor = await pool.query(
        "INSERT INTO lessons (name, price, description, unit, expiry_date) VALUES( $1, $2, $3, $4, $5) RETURNING * ",
        [ lesson_name,
          price,
          description,
          unit,
          expiry_date
        ]
      );

      if (res.statusCode === 200)       res.send("lessons details posted successfully");
     } catch (error) {
     res.json(error.message);
    console.log(error.message);
  }
});

//delete one lesson
router.delete("/lessons/:id", async (req, res) => {
  try {
  const { id } = req.params
  const idExist = await pool.query("SELECT EXISTS (SELECT * FROM lessons WHERE lessons_id = $1)", [id]); 
  //console.log(idExist.rows[0].exists)
 if (!idExist.rows[0].exists) throw new Error ("lesson not available")  
 const deleteLesson = await pool.query("DELETE FROM lessons WHERE lessons_id = $1 RETURNING *", [id])
  if (res.statusCode == 200) res.send('lesson Deleted Successfully')
     } catch (error) {
  res.send(error.message)
  console.log(error.message)
 }
});

//update one lesson
router.put("/lessons/:id", async (req, res) => {
  try {
      
  const { id } = req.params;
  const idExist = await pool.query("SELECT EXISTS (SELECT * FROM lessons WHERE lessons_id = $1)", [id]); 
  //console.log(idExist.rows[0].exists)
 if (!idExist.rows[0].exists) throw new Error ("lesson not available")  
  const {
    lesson_name,
    price,
    description,
    unit,
    expiry_date
  } = req.body
  const updateInstructor = await pool.query("UPDATE lessons SET  name = $1,   price = $2, description = $3, unit = $4, expiry_date = $5 WHERE lessons_id = $6 RETURNING *", 
  [ 
    lesson_name,
    price,
    description,
    unit,
    expiry_date,
    id
    ] ) 
  res.send(`${id} updated`);
} catch (error) {
    res.send(error.message)
}
});

module.exports = router;
