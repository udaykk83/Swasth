import * as CalorieService from './../services/calorieService.js';
//these are controllers for respective calorie routes
export const getAllCalories = (request, response) => {
    CalorieService.getAllCalories(request, response);
};

//to add the record
export const addCalorieLog = (request, response) => {
    CalorieService.addCalorieLog(request, response);
};

//to edit the record
export const editCalorieLog = (request, response) => {
    CalorieService.editCalorieLog(request, response);
};

//to delete the record
export const deleteCalorieLog = (request, response) => {
    CalorieService.deleteCalorieLog(request, response);
};

