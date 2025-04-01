require('dotenv').config();
const { Client } = require('pg');

async function testConnection() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('Attempting to connect to database...');
    await client.connect();
    console.log('Successfully connected to database');
    
    const result = await client.query('SELECT NOW()');
    console.log('Database time:', result.rows[0]);
    
    await client.end();
    console.log('Connection closed');
  } catch (err) {
    console.error('Database connection error:', {
      message: err.message,
      code: err.code,
      stack: err.stack
    });
  }
}

testConnection();