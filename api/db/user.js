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
        //console.log(values);
        const readAllQuery = 
        `INSERT INTO user_account (email, last_login) VALUES ($1, NOW()) RETURNING *`;
        const { rows } = await database.insert(readAllQuery, values);
        //console.log(rows[0].user_id);
        //return res.send(rows);
        let userId = {};
        userId[userId] = rows[0].user_id;
        this.createProfile(userId);
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
  // get [table] data with email
  async getData (cols, table, email) {
    try {
      const colQuery = cols.map(col => `${col}`);
      const readAllQuery = `SELECT ${colQuery} FROM ${table} INNER JOIN user_account USING (user_id) WHERE email ='${email}'`;
      console.log(readAllQuery);
      const { rows } = await database.select(readAllQuery);
      return rows[0];
    } catch (error) {
      return error;
    }
  },
  // update last_login
  async updateLastLogin(userId) {
    try {
      const readAllQuery = `UPDATE user_account SET last_login=NOW() WHERE user_id=${userId} RETURNING *`;
      const { rows } = await database.select(readAllQuery);
      console.log("last login updated!");
      return rows[0];
    } catch (error) {
      return error;
    }
  }, 
  // update last_update
  async updateLastUpdate(userId) {
    try {
      const readAllQuery = `UPDATE user_profile SET last_update=NOW() WHERE user_id=${userId} RETURNING *`;
      const { rows } = await database.select(readAllQuery);
      return rows[0];
    } catch (error) {
      return error;
    }
  },
  // get array of all rows from table
  async getAll(table) {
    try {
      const readAllQuery = `SELECT * FROM ${table}`;
      console.log(readAllQuery)
      const { rows } = await database.select(readAllQuery);
      return rows;
    } catch (error) {
      return error;
    }
  },
  // add data for specific section of profile
  async updateProfile (userId, data) {
    try {
      const values = Object.values(data);
      const cols = Object.keys(data);
      const colQuery = cols.map((key, index) => `${camelToSnake(key)}=($${index+1})`);
      const readAllQuery = `UPDATE user_profile SET ${colQuery} WHERE user_id=${userId} RETURNING *`;
      //console.log(readAllQuery);
      const { rows } = await database.insert(readAllQuery, values); 
      //console.log("insert") 
      return rows;
    } catch (error) {
      return error;
    }
  },
  async testUpdate(userId) {
    try {
      //console.log("hello??")
      const values = ["first", "last"];
      const readAllQuery = `UPDATE user_profile SET firstName='first', lastName='last' WHERE user_id=${userId} RETURNING *`;
      //console.log("query made")
      const { rows } = await database.select(readAllQuery);
      //console.log("yay")
      return rows;
    } catch (error) {
      return error;
    }
  },
  async delete(userId) {
    try {
      //console.log("calling delete method")
      const readAllQuery = `DELETE FROM user_account WHERE user_id=${userId} RETURNING *`;
      //console.log(readAllQuery)
      const { rows } = await database.select(readAllQuery);
      //console.log(rows);
      return rows;
    } catch (error) {
      return error;
    }
  }
};


module.exports = User;


