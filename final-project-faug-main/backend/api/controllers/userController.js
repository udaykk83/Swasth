import * as UserService from './../services/userService.js';

//these are controllers for respective user routes
export const register = (request, response) => {
    const payload = request.body;
    UserService.register(payload, response);
};
//for logion
export const login = (request, response) => {
    const payload = request.body;
    UserService.login(payload, response);
};

//to fetch user data
export const getUserDetailsById = (request, response) => {
    UserService.getUserDetailsById(request, response);
};

//to apply for trainer position by user
export const applyTrainerPosition = (request, response) => {
    UserService.applyTrainerPosition(request, response);
};

//for user to request booking to the trainer
export const bookAppointment = (request, response) => {
    UserService.bookAppointment(request, response);
};

//for checking the availablility of the session
export const checkBookingAvailability = (request, response) => {
    UserService.checkBookingAvailability(request, response);
};

