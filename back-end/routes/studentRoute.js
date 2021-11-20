const express = require("express");
const {
  getAllStudents,
  getStudentById,
  postStudent,
} = require("../controllers/studentController");

const router = express.Router();

/* GET users listing. */
router.get("/", getAllStudents);
router.post("/", postStudent);
router.get("/:id", getStudentById);

module.exports = router;
