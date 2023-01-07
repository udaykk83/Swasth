import * as TrainerService from './../services/trainerService.js';

//these are controllers for respective trainer routes
export const getTrainerInfoByUserId = (request, response) => {
    TrainerService.getTrainerInfoByUserId(request, response);
};

export const getTrainerInfoById = (request, response) => {
    TrainerService.getTrainerInfoById(request, response);
};

export const updateTrainerProfile = (request, response) => {
    TrainerService.updateTrainerProfile(request, response);
};

//To get all the sessions by trainer id
export const getSessionsByTrainerId = (request, response) => {
    TrainerService.getSessionsByTrainerId(request, response);
};

//to approve or reject the session details
export const changeSessionStatus = (request, response) => {
    TrainerService.changeSessionStatus(request, response);
};




