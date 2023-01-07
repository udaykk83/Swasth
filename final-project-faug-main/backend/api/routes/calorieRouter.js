import express from 'express';
import * as calorieController from '../controllers/calorieController.js';

//using express
const router = express.Router();

//this route is used for adding calorie graph
router.route('/add-calorie-log')
    .post(calorieController.addCalorieLog);
//this route is used to get all the calories
router.route('/get-all-calories')
    .post(calorieController.getAllCalories);
//this route is used to edit calorie log
router.route('/edit-calorie-log')
    .post(calorieController.editCalorieLog);
//this route is used to delete calorie log
router.route('/delete-calorie-log')
    .post(calorieController.deleteCalorieLog);

export default router;