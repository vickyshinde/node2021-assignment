const express = require('express');
const { login } = require('../controllers/loginController');
const {
  getAllStudents,
  getStudentById,
  postStudent,
  deleteStudentById,
  updateStudentById,
} = require('../controllers/studentController');

const router = express.Router();

/* GET users listing. */
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.post('/', postStudent);
router.delete('/:id', deleteStudentById);
router.put('/:id', updateStudentById);
router.post('/login', login);

module.exports = router;
