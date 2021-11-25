const DepartmentModel = require('../models/departmentModel');

exports.getAllDepartment = async (req, res, next) => {
  try {
    const [department, _] = await DepartmentModel.getAll();
    res.json(department);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
