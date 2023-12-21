
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';


const staffList = async function (req, res) {
    console.log("request sent")
    const result = await userModel.getStaffUsers()
    if (result[0].length > 0) {
        res.json({ success: true, staffList: result[0] });
    }
    else {
        res.status(401).send({ success: false, msg: 'staff not found.' });
    }
}
const newAppointment = async function (req, res) {
    if (!req.body.staff_id || !req.body.appointment_date || !req.body.appointment_reason) {
        res.json({ success: false, msg: 'Please select staff and appointment date.' });
    } else {
        let newAppointment = {
            patient_id: req.user[0].id,
            staff_id: req.body.staff_id,
            appointment_reason: req.body.appointment_reason,
            appointment_date: req.body.appointment_date,
        };
        console.log(newAppointment);
        try{
            const result = await appointmentModel.createAppointment(newAppointment);
            console.log(result);
            res.json({ item: req.user.username, message: 'Appointment created successfully' });
        }
        catch(err)
        {
            res.json({ error: err, message: 'Appointment created failed' });
        }
        

    }
};

const appointmentList = async function (req, res) {
    const result =await appointmentModel.getAppointments();
    console.log(result);
    if (result[0].length > 0) {
        res.json({ success: true, appointmentList: result[0] });
    }
    else {
        res.status(401).send({ success: false, msg: 'appointment not found.' });
    }
};

export default { newAppointment, appointmentList, staffList }