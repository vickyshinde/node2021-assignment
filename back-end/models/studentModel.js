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

  static deleteById(id) {
    let sql = `DELETE FROM Student WHERE id = ${id};`;
    return db.execute(sql);
  }

  static updateById(id, student) {
    console.log(id);
    console.log(student);
    const { role, fname, lname, email, password, city, contact } = student;
    let sql = `UPDATE Student SET role = '${role}', fname = '${fname}', lname = '${lname}', email = '${email}', password = '${password}', city = '${city}', contact = ${contact} WHERE id = ${id};`;
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
