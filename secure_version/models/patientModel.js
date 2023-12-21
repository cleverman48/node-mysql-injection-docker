import { mycon, query } from '../config/database.js'

query(`
    CREATE TABLE IF NOT EXISTS patients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        health_insurance BOOLEAN,
        address VARCHAR(255),
        credit_card VARCHAR(16),
        FOREIGN KEY (user_id) REFERENCES users(id)    
    )`
);
// Get all users
async function getPatients() {
    const  sql = 'SELECT * FROM patients';
    const result =await mycon.query(sql);
    return result;
}

// Get a user by ID
async function getPatientById(id) {
    const sql = 'SELECT * FROM patients WHERE id = ?';
    const values = [id];
    const result =await mycon.query(sql, values);
    return result;
}

// Create a new user
async function createPatient(patient) {
    const sql = 'INSERT INTO patients SET ?';
    const values = [patient];
    const result =await mycon.query(sql, values);
    return result;
}

// Update a user
async function updatePatient(id, patient) {
    const sql = 'UPDATE patients SET ? WHERE id = ?';
    const values = [patient , id];
    const result =await mycon.query(sql, values);
    return result;
}

// Delete a user
async function deletePatient(id) {
    const sql = 'DELETE FROM patients WHERE id = ?';
    const values = [id];
    const result =await mycon.query(sql, values);
    return result;
}

// Export the model functions
export default {
    getPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
};
