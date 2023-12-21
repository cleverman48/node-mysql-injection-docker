import { mycon, query } from '../config/database.js'

query(`
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        role VARCHAR(100) NOT NULL
    )`
);
// Get all users
async function getUsers() {
    const sql = 'SELECT * FROM users';
    const result =await mycon.query(sql);
    return result;
}
// Get all patients
async function getPatientUsers() {
    const sql = 'SELECT * FROM users WHERE role = "patient"';
    const result =await mycon.query(sql);
    return result;
}
// Get all staff
async function getStaffUsers() {
    const sql = 'SELECT * FROM users WHERE role = "staff"';
    const result =await mycon.query(sql);
    return result;
}

// Get a user by ID
async function getUserById(id) {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const values = [id];
    const result =await mycon.query(sql,values);
    return result;
}
// Get a user by email
async function getUserByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const values = [email];
    const result =await mycon.query(sql,values);
    return result;
}

// Create a new user
async function createUser(user) {
    const sql = 'INSERT INTO users SET ?';
    const values = [user];
    const result =await mycon.query(sql,values);
    return result;
}

// Update a user
async function updateUser(id, user) {
    const sql = 'UPDATE users SET ? WHERE id = ?';
    const values = [user, id]
    const result =await mycon.query(sql,values);
    return result;
}

// Delete a user
async function deleteUser(id) {
    const sql = 'DELETE FROM users WHERE id = ?';
    const values = [id];
    const result =await mycon.query(sql,values);
    return result;
}

// Export the model functions
export default {
    getUsers,
    getPatientUsers,
    getStaffUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
};
