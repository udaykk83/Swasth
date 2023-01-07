import userRouter from './userRouter.js';
import apptRouter from './apptRouter.js';
import calorieRouter from './calorieRouter.js';
import trainerRouter from './trainerRouter.js'

//the below is used to initialize the routes in the app.js
// sets the path accordingly
export default (app) => {
    app.use('/user', userRouter);
    app.use('/appt',apptRouter);
    app.use('/calorie',calorieRouter);
    app.use('/trainer', trainerRouter);
}