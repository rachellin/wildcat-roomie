const database = require('./index');

// const User = {
//     async readAll(req, res) {
//       try {
//         const readAllQuery = 'SELECT bio FROM user_profile WHERE user_id=3';
//         const { rows } = await database.query(readAllQuery);
//         return res.send({ rows });
//       } catch (error) {
//         return res.send(error);
//       }
//     }
//   };

const User = {
  async add (data) {
    try {
        const values = Object.values(data);
        console.log(values);
        const readAllQuery = 
        'INSERT INTO user_account (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
        const { rows } = await database.insert(readAllQuery, values);
        //console.log(rows);
        //return res.send(rows);
        return rows;
    } catch (error) {
        console.error(error);
        return error;
    }
  },
  async getPassword (email) {
    try {
      const readAllQuery = `SELECT password FROM user_account WHERE email = '${email}'`;
      const { rows } = await database.select(readAllQuery);
      return rows[0].password;
      //return res.send(rows);
    } catch (error) {
      //return res.send(error);
      return error;
    }
  },
  async exists (email) {
    try {
      const readAllQuery = `SELECT EXISTS (SELECT * FROM user_account WHERE email = '${email}')`;
      const { rows } = await database.select(readAllQuery);
      return rows[0].exists;
      //return res.send(exist);
    } catch (error) {
      //return res.send(error);
      return error;
    }
  },
  async getData (email) {
    try {
      const readAllQuery = `SELECT * FROM user_account WHERE email = '${email}'`;
      const { rows } = await database.select(readAllQuery);
      return rows[0];
    } catch (error) {
      return error;
    }
  }
};

module.exports = User;