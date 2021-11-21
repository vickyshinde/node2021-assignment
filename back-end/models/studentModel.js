const db = require('../services/db');

class StudentModel {
  static getAll() {
    // let sql = 'SELECT * from Student';
    let sql = `SELECT Student.id, Student.role, Student.id, Student.fname, Student.lname, Student.email, Student.password, Student.city, Student.contact, DepartmentStudent.DeptId AS DeptId, Department.name AS Deptname FROM Student JOIN DepartmentStudent
  ON (Student.id=DepartmentStudent.StudId) JOIN Department ON (Department.id=DepartmentStudent.DeptId);`;
    return db.execute(sql);
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

  static updateById(id, student) {
    console.log(id);
    console.log(student);
    const { role, fname, lname, email, password, city, contact, userType } = student;
    let sql = `UPDATE Student SET role = '${role}', fname = '${fname}', lname = '${lname}', email = '${email}', password = '${password}', city = '${city}', contact = ${contact}, userType = ${userType} WHERE id = ${id};`;
    return db.execute(sql);
  }

  static postNewStudent(student) {
    console.log(student);role;
    const { role, fname, lname, email, password, city, contact, userType, DeptId, Deptname } = student;
    // let sql = `INSERT INTO Student (role, fname, lname, email, password, city, contact, userType) value (${role}, '${fname}', '${lname}', '${email}', '${password}', '${city}', ${contact}, 0); SET @Student_id = LAST_INSERT_ID(); INSERT INTO DepartmentStudent (StudId, DeptId) VALUES(@Student_id, ${DeptId});`;
    let sql = `INSERT INTO Student (role, fname, lname, email, password, city, contact, userType) value (${role}, '${fname}', '${lname}', '${email}', '${password}', '${city}', ${contact}, 0); SET @Student_id = LAST_INSERT_ID(); INSERT INTO DepartmentStudent (StudId, DeptId) VALUES(@Student_id, ${DeptId});`;
    return db.execute(sql);
  }
}

module.exports = StudentModel;
