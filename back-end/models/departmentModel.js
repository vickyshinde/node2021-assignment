const db = require('../services/db');

class DepartmentModel {
  static getAll() {
    let sql = `select * from Department`;
    let result = db.execute(sql);
    result.then(function (data) {
      console.log(data);
    });
    // console.log(result);
    return result;
  }
}

module.exports = DepartmentModel;
