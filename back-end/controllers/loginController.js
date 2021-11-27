const jwt = require('jsonwebtoken');
const db = require('../services/db');
const bcrypt = require('bcryptjs');

exports.login = async (req, res, next) => {
  try {
    const [row] = await db.execute('SELECT * FROM `Student` WHERE `email`=?', [req.body.email]);

    if (row.length === 0) {
      return res.json({
        message: 'Invalid email address',
        status: 422,
      });
    }

    const passMatch = await bcrypt.compare(req.body.password, row[0].password);
    if (!passMatch) {
      return res.json({
        message: 'Incorrect password',
        status: 422,
      });
    } else {
      const theToken = jwt.sign(
        { id: row[0].id, userType: row[0].userType, fname: row[0].fname },
        'the-super-strong-secret-key',
        {
          expiresIn: '1h',
        }
      );
      res.cookie('token', theToken, {
        expires: new Date(Date.now() + 12000000),
        // httpOnly: true,
      });
      return res.json({
        token: theToken,
        message: 'user signin successfully',
        row,
      });
    }
  } catch (err) {
    next(err);
  }
};
