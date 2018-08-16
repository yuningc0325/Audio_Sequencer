const { Pool } = require('pg');
const pool = new Pool({
  user: 'ubuntu',
  host: 'localhost',
  database: 'finalProject',
  password: 'Yuyuyu123',
});

module.exports=pool;