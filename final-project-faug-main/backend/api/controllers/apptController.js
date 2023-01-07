import * as ApptService from '../services/apptService.js';

//these are controllers for respective appointment routes
export const getAllUsers = (request, response) => {
    ApptService.getAllUsers(request, response);
};

//to get all the trainers by the admin
export const getAllTrainers = (request, response) => {
    ApptService.getAllTrainers(request, response);
}

//to get only approved trainers for the users
export const getAllApprovedTrainers = (request, response) => {
    ApptService.getAllApprovedTrainers(request, response);
}

//to update status by admin
export const updateTrainerStatus = (request, response) => {
    ApptService.updateTrainerStatus(request, response);
}

//to accept or reject all the sessions
export const getAllAppointmentsbyUserId = (request, response) => {
    ApptService.getAllAppointmentsbyUserId(request, response);
}



