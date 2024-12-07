const { Pool } = require('pg');
const axios = require('axios'); 

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'trufa1507',
  database: 'likeme',
  allowExitOnIdle: true
});