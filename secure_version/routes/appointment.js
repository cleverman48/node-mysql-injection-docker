import express from 'express';
const router = express.Router();
import appointmentController from '../controllers/appointmentController.js';


/**
 * (POST Method)
 * Create a new book
 */
router.post('/appointment', appointmentController.newAppointment);
router.post('/appointmentList', appointmentController.appointmentList);
router.post('/staffList', appointmentController.staffList);



export default router;