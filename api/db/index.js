require('dotenv').config()
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL,
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
  // ssl: {
  //   rejectUnauthorized: false
  // }
  //ssl: false // false if local since i guess localhost server doesn't support ssl
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// general query or select
function select (text) {
    return new Promise((resolve, reject) => {
      pool
        .query(text)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
}

// insert values into table
function insert (text, values) {
    return new Promise((resolve, reject) => {
      pool
        .query(text, values)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
}

// pool.on('connect', () => console.log('connected to db'));

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows)
  })
})

module.exports = {
    select, 
    insert
};