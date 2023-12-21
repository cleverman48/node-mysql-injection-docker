import dotenv from 'dotenv'
import mysql from 'mysql2/promise';

dotenv.config();
let mycon = await mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
}).then((connection) => {
  connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME};`);
  console.log("Database Created!");
  connection.end();
});
mycon = await mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
});
await mycon.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: ", err);
  } else {
    console.log("Connected to MySQL database");
  }
});
async function query(myquery) {
  try {
    const [results] = await mycon.execute(myquery);
    return results;
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  }
}
export { mycon, query };