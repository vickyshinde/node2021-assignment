const express = require('express');
const { getAllDepartment } = require('../controllers/departmentController');

const router = express.Router();

/* GET Department listing. */
router.get('/', getAllDepartment);

module.exports = router;
