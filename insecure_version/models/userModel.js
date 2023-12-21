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
    const sql = `SELECT * FROM users WHERE id = ${id}`;
    const result =await mycon.query(sql);
    return result;
}
// Get a user by email
async function getUserByEmail(email) {
    const sql = `SELECT * FROM users WHERE email = '${email}'`;
    const result =await mycon.query(sql);
    return result;
}

// Create a new user
async function createUser(user) {
    const sql = `INSERT INTO users (username,email,password,role) VALUES('${user.username}','${user.email}','${user.password}','${user.role}')`;
    const result =await mycon.query(sql);
    return result;
}

// Update a user
async function updateUser(id, user) {
    const sql = `UPDATE users SET username='${user.username}',email='${user.email}',password='${user.password}',role='${user.role}' WHERE id = ${id}`;
    const result =await mycon.query(sql);
    return result;
}

// Delete a user
async function deleteUser(id) {
    const sql = `DELETE FROM users WHERE id = ${id}`;
    const result =await mycon.query(sql);
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
