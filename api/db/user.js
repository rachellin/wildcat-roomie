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
  // add user to user_account
  async add (data) {
    try {
        const values = Object.values(data);
        console.log(values);
        const readAllQuery = 
        `INSERT INTO user_account (email, last_login) VALUES ($1, NOW()) RETURNING *`;
        const { rows } = await database.insert(readAllQuery, values);
        //console.log(rows[0].user_id);
        //return res.send(rows);
        let userid = {};
        userid[userid] = rows[0].user_id;
        this.createProfile(userid);
        return rows;
    } catch (error) {
        console.error(error);
        return error;
    }
  },
  // add row to user_profile (only with user_id)
  async createProfile (data) {
    try {
      const values = Object.values(data);
      console.log(values);
      const readAllQuery = 
      `INSERT INTO user_profile (user_id) 
      VALUES ($1) 
      RETURNING *`;
      const { rows } = await database.insert(readAllQuery, values);
      return rows;
    } catch (error) {
        console.error(error);
        return error;
    }
  },
  // check if email exists in user_account
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
  // get [table] data with user_id userid
  async getData (table, userid) {
    try {
      const readAllQuery = `SELECT * FROM ${table} WHERE user_id = '${userid}'`;
      const { rows } = await database.select(readAllQuery);
      return rows[0];
    } catch (error) {
      return error;
    }
  },
  // add data for specific section of profile
  async addProfile (section) {
    try {
      const values = Object.values(data);
      console.log(values);
      //find user id where 
      //about, basics, filters, social
      const readAllQuery = 
      `INSERT INTO user_profile (user_id, ${section}) 
      VALUES (${userid}, $2) 
      RETURNING *`;
      const { rows } = await database.insert(readAllQuery, values);
      //console.log(rows);
      //return res.send(rows);
      return rows;
    } catch (error) {
      return error;
    }
  }
};


module.exports = User;