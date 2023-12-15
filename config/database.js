import dotenv from 'dotenv'
import mysql from 'mysql2';

dotenv.config()
const mycon = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
});
mycon.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: ", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

async function query(myquery) {
  mycon.query(myquery, (err, results) => {
    if (err) {
      return err;
    } else {
      return results;
    }
  });
}
export { mycon, query };