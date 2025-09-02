import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
};

const dbConfigWithDatabase = {
  ...dbConfig,
  database: process.env.DB_NAME || 'school_db',
};

export async function connectDB() {
  try {
    const connection = await mysql.createConnection(dbConfigWithDatabase);
    return connection;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

export async function createDatabase() {
  const connection = await mysql.createConnection(dbConfig);
  
  try {
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'school_db'}`);
    console.log('Database created successfully');
  } catch (error) {
    console.error('Error creating database:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

export async function createTables() {
  // First create database if it doesn't exist
  await createDatabase();
  
  // Then connect to the database and create tables
  const connection = await connectDB();
  
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address TEXT NOT NULL,
      city VARCHAR(100) NOT NULL,
      state VARCHAR(100) NOT NULL,
      contact VARCHAR(15) NOT NULL,
      image VARCHAR(255) NOT NULL,
      email_id VARCHAR(255) NOT NULL
    )
  `;
  
  try {
    await connection.execute(createTableQuery);
    console.log('Schools table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
    throw error;
  } finally {
    await connection.end();
  }
}
