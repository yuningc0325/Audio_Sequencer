/**
 * @author: Yu-Ning, Chang 
 * This file is used to connect to postgresql DB
 * 
 * API I use in my code, license details can be found in "node_modules" package.
 * =====================
 * "pg": "^7.4.3",https://node-postgres.com/
 */

const { Pool } = require('pg');
// Configure db pool with my hostName, database name, and postgresql password.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

module.exports=pool;