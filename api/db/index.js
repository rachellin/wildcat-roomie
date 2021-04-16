require('dotenv').config()
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
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

pool.on('connect', () => console.log('connected to db'));

module.exports = {
    select, 
    insert
};