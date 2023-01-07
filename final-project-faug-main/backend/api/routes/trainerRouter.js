import express from 'express';
import * as TrainerController from '../controllers/trainerController.js';

//using express
const router = express.Router();

// the below url for post and get all

//this route is to post trainer information by id
router.route('/trainerInfoByUserId')
    .post(TrainerController.getTrainerInfoByUserId);

//this route is to post trainer user by id
router.route('/trainerInfoById')
    .post(TrainerController.getTrainerInfoById);

//this route is used to update trainer profile
router.route('/updateTrainerProfile')
    .post(TrainerController.updateTrainerProfile);

//this route is used get trainer sessions by id
router.route('/getSessionsByTrainerId')
    .get(TrainerController.getSessionsByTrainerId);

//this route is used to change the session status
router.route('/changeSessionStatus')
    .post(TrainerController.changeSessionStatus);


export default router;