/**
 * @author: Yu-Ning, Chang 
 * This file is used to set up psql schema
 * 
 * API I use in my code, license details can be found in "node_modules" package.
 * =====================
 * "pg": "^7.4.3",https://node-postgres.com/
 */

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('SELECT *  FROM test_table;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});