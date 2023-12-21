import { mycon, query } from '../config/database.js'

query(`
    CREATE TABLE IF NOT EXISTS appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        patient_id INT NOT NULL,
        staff_id INT NOT NULL,
        appointment_reason VARCHAR(100),
        appointment_date DATETIME NOT NULL
    )`
);
// Get all appointments
async function getAppointments() {
    const sql = 'SELECT * FROM appointments';
    const result =await mycon.query(sql);
    return result;
}

// Get a appointment by ID
async function getAppointmentById(id) {
    const sql = `SELECT * FROM appointments WHERE id = ${id}`;
    const result =await mycon.query(sql);
    return result;
}

// Create a new appointment
async function createAppointment(appointment) {
   
    const sql = `INSERT INTO appointments (patient_id,staff_id,appointment_reason,appointment_date) VALUES(${appointment.patient_id},${appointment.staff_id},'${appointment.appointment_reason}','${appointment.appointment_date}')`;
    const result =await mycon.query(sql);
    return result;
}
// Update a appointment
async function updateAppointment(id, appointment) {
    const sql = `UPDATE appointments SET patient_id = ${appointment.patient_id}, staff_id = ${appointment.staff_id}, appointment_reason = '${appointment.appointment_reason}', appointment_date = '${appointment.appointment_date}' WHERE id = ${id}`;
    const result =await mycon.query(sql);
    return result;
}
// Delete a appointment
async function deleteAppointment(id) {
    const sql = `DELETE FROM appointments WHERE id = ${id}`;
    const result =await mycon.query(sql);
    return result;
}
// Export the model functions
export default {
    getAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment
};
