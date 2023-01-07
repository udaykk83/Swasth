import express from 'express';
import * as UserController from '../controllers/userController.js';

//using express
const router = express.Router();

// the below url for post and get all
router.route('/signup')
    .post(UserController.register);


router.route('/login')
    .post(UserController.login);

router.route('/userDetailsById')
    .post(UserController.getUserDetailsById);

router.route('/apply-trainer')
    .post(UserController.applyTrainerPosition);

router.route('/')
    .post(UserController.applyTrainerPosition);

router.route('/book-appointment')
    .post(UserController.bookAppointment);

router.route('/check-booking-availability')
    .post(UserController.checkBookingAvailability);

export default router;