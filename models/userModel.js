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
function getUsers(callback) {
    mycon.query('SELECT * FROM users', callback);
}
// Get all patients
function getPatientUsers(callback) {
    mycon.query('SELECT * FROM users WHERE role = "patient"', callback);
}
// Get all staff
function getStaffUsers(callback) {
    mycon.query('SELECT * FROM users WHERE role = "staff"', callback);
}

// Get a user by ID
function getUserById(id, callback) {
    mycon.query('SELECT * FROM users WHERE id = ?', [id], callback);
}
// Get a user by email
function getUserByEmail(email, callback) {
    mycon.query('SELECT * FROM users WHERE email = ?', [email], callback);
}

// Create a new user
function createUser(user, callback) {
    mycon.query('INSERT INTO users SET ?', user, callback);
}

// Update a user
function updateUser(id, user, callback) {
    mycon.query('UPDATE users SET ? WHERE id = ?', [user, id], callback);
}

// Delete a user
function deleteUser(id, callback) {
    mycon.query('DELETE FROM users WHERE id = ?', [id], callback);
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
