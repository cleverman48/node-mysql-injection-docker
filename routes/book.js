import express from 'express';
const router = express.Router();
import bookController from '../controllers/bookController.js';


/**
 * (POST Method)
 * Create a new book
 */
router.post('/book', bookController.newBook);


/**
 * (GET Method)
 * Display books list
 */
router.get('/bookList', bookController.booksList);
router.get('/staffList', bookController.staffList);


export default router;