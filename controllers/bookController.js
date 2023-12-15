
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';


const staffList = function(req, res)
{
    userModel.getStaffUsers(async (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to get staff' });
        } else {
            if (result.length > 0) 
            {
                res.json({ success: true, staffList: result});          
            }
            else
            {
                res.status(401).send({ success: false, msg: 'staff not found.' });
            }
        }
    })
}
const newBook = function(req, res) {
    if (!req.body.staff_id || !req.body.appointment_date ) {
        res.json({ success: false, msg: 'Please select staff and appointment date.' });
    } else {
        let newAppointment = {
            patient_id: req.user.id,
            staff_id: req.body.staff_id,
            appointment_date: req.body.appointment_date,
        };
        appointmentModel.createAppointment(newAppointment, (err, item) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to create user' });
            } else {
                res.json({ item: item, message: 'Appointment created successfully' });
            }
        });
    }
};

const booksList = function(req, res) {
    appointmentModel.getAppointments(async (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to get appointment list' });
        } else {
            if (result.length > 0) 
            {
                res.json({ success: true, appointmentList: result});          
            }
            else
            {
                res.status(401).send({ success: false, msg: 'appointment not found.' });
            }
        }
    })
};

export default {newBook, booksList, staffList}