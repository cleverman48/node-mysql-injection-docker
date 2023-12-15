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
function getPatients(callback) {
    mycon.query('SELECT * FROM patients', callback);
}

// Get a user by ID
function getPatientById(id, callback) {
    mycon.query('SELECT * FROM patients WHERE id = ?', [id], callback);
}

// Create a new user
function createPatient(patient, callback) {
    mycon.query('INSERT INTO patients SET ?', patient, callback);
}

// Update a user
function updatePatient(id, patient, callback) {
    mycon.query('UPDATE patients SET ? WHERE id = ?', [patient, id], callback);
}

// Delete a user
function deletePatient(id, callback) {
    mycon.query('DELETE FROM patients WHERE id = ?', [id], callback);
}

// Export the model functions
export default {
    getPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
};
