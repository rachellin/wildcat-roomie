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

const camelToSnake = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

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
        return rows[0].user_id;
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
      `INSERT INTO user_profile (user_id) VALUES ($1) RETURNING *`;
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
      console.log(rows[0]);
      return rows[0];
    } catch (error) {
      return error;
    }
  },
  // add data for specific section of profile
  async updateProfile (userid, data) {
    try {
      const values = Object.values(data);
      console.log(values);
      //about, basics, filters, social
      const cols = Object.keys(data);
      const colQuery = cols.map((key, index) => `${camelToSnake(key)}=($${index+1})`);
      const readAllQuery = `UPDATE user_profile SET ${colQuery} WHERE user_id=${userid} RETURNING *`;
      console.log(readAllQuery);
      const { rows } = await database.insert(readAllQuery, values); // need an update one??
      console.log("insert") // never makes it here for some reason? but then how does it go on to the next part..
      return rows;
    } catch (error) {
      return error;
    }
  },
  async testUpdate(userid) {
    try {
      console.log("hello??")
      const values = ["first", "last"];
      const readAllQuery = `UPDATE user_profile SET firstName='first', lastName='last' WHERE user_id=${userid} RETURNING *`;
      console.log("query made")
      const { rows } = await database.select(readAllQuery);
      console.log("yay")
      return rows;
    } catch (error) {
      return error;
    }
  }
};


module.exports = User;


