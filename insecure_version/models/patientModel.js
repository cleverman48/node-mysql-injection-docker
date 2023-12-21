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
    const sql = `SELECT * FROM patients WHERE id = ${id}`;
    const result =await mycon.query(sql);
    return result;
}
// Create a new user
async function createPatient(patient) {
    const sql = `INSERT INTO patients (user_id,health_insurance,address,credit_card) VALUES(${patient.user_id},${patient.health_insurance},'${patient.address}','${patient.credit_card}')`;
    const result =await mycon.query(sql);
    return result;
}

// Update a user
async function updatePatient(id, patient) {
    const sql = `UPDATE patients SET user_id=${patient.user_id},health_insurance=${patient.health_insurance},address='${patient.address}',credit_card='${patient.credit_card}' WHERE id = ${id}`;
    const result =await mycon.query(sql);
    return result;
}

// Delete a user
async function deletePatient(id) {
    const sql = `DELETE FROM patients WHERE id = ${id}`;
    const result =await mycon.query(sql);
    return result;
}

// Export the model functions
export default {
    getPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
}
