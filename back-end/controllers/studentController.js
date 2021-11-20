const StudentModel = require("../models/studentModel");

exports.getAllStudents = async (req, res, next) => {
  try {
    const [students, _] = await StudentModel.getAll();
    res.json(students);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getStudentById = async (req, res, next) => {
  try {
    const [student, _] = await StudentModel.getById(req.params.id);
    res.json(student);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.postStudent = async (req, res, next) => {
  try {
    const student = await StudentModel.postNewStudent(req.body);
    res.json(student);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
