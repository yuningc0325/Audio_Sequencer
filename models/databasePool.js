/**
 * @author: Yu-Ning, Chang 
 * This file is used to configure routes.
 * 
 * API I use in my code, license details can be found in "node_modules" package.
 * =====================
 * "pg": "^7.4.3",https://node-postgres.com/
 */

const { Pool } = require('pg');
// Configure db pool with my hostName, database name, and postgresql password.
const pool = new Pool({
  user: 'ubuntu',
  host: 'localhost',
  database: 'finalProject',
  password: 'Yuyuyu123',
});

module.exports=pool;