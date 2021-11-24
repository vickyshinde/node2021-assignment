const db = require('../services/db');
const bcrypt = require('bcryptjs');

exports.login = async (req, res, next) => {
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   return res.status(422).json({ errors: errors.array() });
  // }

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
      res.cookie('mytoken', 'abc', {
        expires: new Date(Date.now() + 120000),
        httpOnly: true,
      });
      return res.json({
        message: 'user signin successfully',
        row,
      });
    }

    // const theToken = jwt.sign({ id: row[0].id }, 'the-super-strong-secrect', { expiresIn: '1h' });

    /* return res.json({
      row,
    }) */
  } catch (err) {
    next(err);
  }
};
