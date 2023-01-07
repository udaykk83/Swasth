import User from '../models/user.js';
import Trainer from '../models/trainer.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Appointment from '../models/appointmentModel.js';
import moment from 'moment';

// backend server to do operations on users 
export const register = async (userDetails, response) => {
    try {
        const userExists = await User.findOne({ email: userDetails.email });
        if (userExists) {
            console.log("exists");
            return response
                .status(200)
                .send({ message: "User already exists", success: false });
        }
        const password = userDetails.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        userDetails.password = hashedPassword;
        console.log(userDetails);
        const newuser = new User(userDetails);
        newuser.save();
        return response
            .status(200)
            .send({ message: "User created successfully", success: true });
    } catch (error) {
        console.log(error);
        return response
            .status(500)
            .send({ message: "Error creating user", success: false, error });
    }

}

//service to check if the user is existing and log in the user
export const login = async (userLoginDetails, response) => {
    try {
        const user = await User.findOne({ email: userLoginDetails.email });
        if (!user) {
            return response
                .status(200)
                .send({ message: "User does not exist", success: false });
        }
        const isMatch = await bcrypt.compare(userLoginDetails.password, user.password);
        if (!isMatch) {
            return response
                .status(200)
                .send({ message: "Password is incorrect", success: false });
        } else {
            const token = jwt.sign({ id: user._id }, `${process.env.SECRET_KEY}`, {
                expiresIn: "1d",
            });
            response
                .status(200)
                .send({ message: "Login successful", success: true, data: token });
        }
    } catch (error) {
        console.log(error);
        response
            .status(500)
            .send({ message: "Error logging in", success: false, error });
    }
}

//service to get the user details by id
export const getUserDetailsById = async (req, response) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];

        jwt.verify(token, `${process.env.SECRET_KEY}`, async (err, decoded) => {
            if (err) {
                console.log(err);
                return response.status(401).send({
                    message: "Auth failed",
                    success: false,
                });
            } else {
                try {
                    req.body.userId = decoded.id;
                    const user = await User.findOne({ _id: req.body.userId });
                    user.password = undefined;
                    if (!user) {
                        return response
                            .status(200)
                            .send({ message: "User does not exist", success: false });
                    } else {
                        return response.status(200).send({
                            message : "User fetched",
                            success: true,
                            data: user,
                        });
                    }
                } catch (error) {
                    response
                        .status(500)
                        .send({ message: "Error getting user info", success: false, error });
                }
            }
        });
    } catch (error) {
        console.log(error);
        return response.status(401).send({
            message: "Auth failed",
            success: false,
        });
    }
}

//service to the form that is to be used to apply trainer position
export const applyTrainerPosition = async (req, res) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];

        jwt.verify(token, `${process.env.SECRET_KEY}`, async (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).send({
                    message: "Auth failed",
                    success: false,
                });
            } else {
                try {
                    const newtrainer = new Trainer({ ...req.body, status: "pending" });
                    await newtrainer.save();
                    res.status(200).send({
                        success: true,
                        message: "Trainer account applied successfully",
                    });
                } catch (error) {
                    console.log(error);
                    res.status(500).send({
                        message: "Error applying trainer account",
                        success: false,
                        error,
                    });
                }
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            message: "Auth failed",
            success: false,
        });
    }
}

//service to book appointment for a particular trainer
export const bookAppointment = async (req, res) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];

        jwt.verify(token, `${process.env.SECRET_KEY}`, async (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).send({
                    message: "Auth failed",
                    success: false,
                });
            } else {
                try {
                    req.body.status = "pending";
                    req.body.date = moment(req.body.date, 'MM-DD-YYYY').toISOString();
                    req.body.time = moment(req.body.time, 'HH:mm').toISOString();
                    const newAppointment = new Appointment(req.body);
                    await newAppointment.save();
                    const trainer = await Trainer.findOne({_id : req.body.trainerId});
                    res.status(200).send({
                        success: true,
                        message: "Appointment scheduled Successfully",
                    });
                } catch (error) {
                    console.log(error);
                    res.status(500).send({
                        message: "Error in scheduling appointment",
                        success: false,
                        error,
                    });
                }
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            message: "Auth failed",
            success: false,
        });
    }
}

//service for checking the booking availability of the trainer
export const checkBookingAvailability = async (req, res) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];

        jwt.verify(token, `${process.env.SECRET_KEY}`, async (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).send({
                    message: "Auth failed",
                    success: false,
                });
            } else {
                try {
                   const date = moment(req.body.date, 'MM-DD-YYYY').toISOString();
                   const fromTime = moment(req.body.time,'HH:mm').subtract(1,'hours').toISOString();
                   const toTime = moment(req.body.time,'HH:mm').add(1,'hours').toISOString();
                   const trainerId = req.body.trainerId;
                   const appointments = await Appointment.find({
                        trainerId,
                        date,
                        time: {$gte: fromTime, $lte: toTime},
                        //status: "approved",    
                   });
                   if(appointments.length > 0){
                        return res.status(200).send({
                            success: false,
                            message: "Appointment not Available",
                        });
                   }
                   else{
                        return res.status(200).send({
                        success: true,
                        message: "Appointment available",
                        });
                   }
                    
                } catch (error) {
                    console.log(error);
                    res.status(500).send({
                        message: "Error in scheduling appointment",
                        success: false,
                        error,
                    });
                }
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            message: "Auth failed",
            success: false,
        });
    }
}


