import express from 'express';
import * as ApptController from '../controllers/apptController.js';

//using express
const router = express.Router();


//Route requests regarding appointments

//this routes is to get all users from user database
router.route('/get-all-users')
    .get(ApptController.getAllUsers);

//this route is to get all users from trainer from trainer database    
router.route('/get-all-trainers')
    .get(ApptController.getAllTrainers);

//this route is to get approved trainers from trainer database    
router.route('/get-all-approved-trainers')
    .get(ApptController.getAllApprovedTrainers);

    //this route is to update the status of the trainer
router.route('/update-trainer-status')
    .post(ApptController.updateTrainerStatus);

//this route is to get the appointments by user ID.
router.route('/get-appointments-by-userId')
    .get(ApptController.getAllAppointmentsbyUserId);


export default router;