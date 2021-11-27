const db = require('../services/db');
const bcrypt = require('bcryptjs');

class StudentModel {
  static getAll() {
    // let sql = 'SELECT * from Student';
    let sql = `SELECT Student.id, Student.role, Student.id, Student.fname, Student.lname, Student.email, Student.password, Student.city, Student.contact, DepartmentStudent.DeptId AS DeptId, Department.name AS Deptname FROM Student JOIN DepartmentStudent
    ON (Student.id=DepartmentStudent.StudId) JOIN Department ON (Department.id=DepartmentStudent.DeptId) WHERE Student.userType != 1;`;
    // return db.execute(sql);
    let result = db.execute(sql);
    result.then(function (data) {
      console.log(data);
    });
    // console.log(result);
    return result;
  }

  static getById(id) {
    // let sql = `SELECT * FROM Student WHERE id = ${id};`;
    let sql = `SELECT Student.id, Student.role, DepartmentStudent.StudId AS StudId, Student.fname, Student.lname, Student.email, Student.password, Student.city, Student.contact, DepartmentStudent.DeptId AS DeptId, Department.name AS Deptname FROM Student JOIN DepartmentStudent
    ON (Student.id=DepartmentStudent.StudId) JOIN Department ON (Department.id=DepartmentStudent.DeptId) WHERE StudId = ${id};`;
    return db.execute(sql);
  }

  static deleteById(id) {
    let sql = `DELETE FROM Student WHERE id = ${id};`;
    return db.execute(sql);
  }

  static async updateById(id, student) {
    console.log(id);
    console.log(student);
    const { role, fname, lname, email, password, city, contact, userType, DeptId, Deptname } = student;
    // const hashPass = await bcrypt.hash(password, 12);
    let sql = `UPDATE Student SET role = '${role}', fname = '${fname}', lname = '${lname}', email = '${email}', city = '${city}', contact = ${contact}, userType = 0 WHERE id = ${id};`;
    let result = await db.execute(sql);
    let sql1 = `UPDATE DepartmentStudent SET DeptId = ${DeptId} WHERE StudId = ${id};`;
    await db.execute(sql1);
    return result;
  }

  static async postNewStudent(student) {
    // console.log(student);
    const { role, fname, lname, email, password, city, contact, userType, DeptId, Deptname } = student;
    const hashPass = await bcrypt.hash(password, 12);
    let sql = `INSERT INTO Student (role, fname, lname, email, password, city, contact, userType) value (${role}, '${fname}', '${lname}', '${email}', '${hashPass}', '${city}', ${contact}, 0);`;
    let [result] = await db.execute(sql);
    const insertId = result.insertId;
    console.log(insertId);
    let sql1 = `INSERT INTO DepartmentStudent (StudId, DeptId) VALUES(${insertId}, ${DeptId});`;
    await db.execute(sql1);
    return result;
  }
}

module.exports = StudentModel;
