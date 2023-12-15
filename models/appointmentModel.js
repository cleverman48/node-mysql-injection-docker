import { mycon, query } from '../config/database.js'

query(`
    CREATE TABLE IF NOT EXISTS appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        patient_id INT NOT NULL,
        staff_id INT NOT NULL,
        appointment_date DATETIME NOT NULL,
        FOREIGN KEY (patient_id) REFERENCES users(id),
        FOREIGN KEY (staff_id) REFERENCES users(id)
    )`
);
// Get all appointments
function getAppointments(callback) {
    mycon.query('SELECT * FROM appointments', callback);
}

// Get a appointment by ID
function getAppointmentById(id, callback) {
    mycon.query('SELECT * FROM appointments WHERE id = ?', [id], callback);
}

// Create a new appointment
function createAppointment(appointment, callback) {
    mycon.query('INSERT INTO appointments SET ?', appointment, callback);
}

// Update a appointment
function updateAppointment(id, appointment, callback) {
    mycon.query('UPDATE appointments SET ? WHERE id = ?', [appointment, id], callback);
}

// Delete a appointment
function deleteAppointment(id, callback) {
    mycon.query('DELETE FROM appointments WHERE id = ?', [id], callback);
}

// Export the model functions
export default {
    getAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment
};
