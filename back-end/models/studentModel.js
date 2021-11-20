const db = require("../services/db");

class StudentModel {
  static getAll() {
    let sql = "SELECT * from Student";
    return db.execute(sql);
  }

  static getById(id) {
    let sql = `SELECT * FROM Student WHERE id = ${id};`;
    return db.execute(sql);
  }

  static postNewStudent(student) {
    console.log(student);
    const { role, fname, lname, email, password, city, contact } = student;
    let sql = `INSERT INTO Student (role, fname, lname, email, password, city, contact) value (${role}, '${fname}', '${lname}', '${email}', '${password}', '${city}', ${contact})`;
    return db.execute(sql);
  }
}

module.exports = StudentModel;
