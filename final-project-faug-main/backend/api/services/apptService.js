import User from '../models/user.js';
import Trainer from '../models/trainer.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Appointments from '../models/appointmentModel.js';

//adding the user details
export const getAllUsers = async (req, res) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        //authenticationg by jwt token 
        jwt.verify(token, `${process.env.SECRET_KEY}`, async (err, decoded) => {
            if (err) {
                console.log(err);
                return response.status(401).send({
                    message: "Auth failed",
                    success: false,
                });
            } else {
                try {
                    const users = await User.find({});
                    res.status(200).send({
                        message: "Users fetched successfully",
                        success: true,
                        data: users,
                    });
                } catch (error) {
                    console.log(error);
                    res.status(500).send({
                        message: "Error fetching all users",
                        success: false,
                        error,
                    });
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

//adding the trainer details
export const getAllTrainers = async (req, res) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        //authenticationg by jwt token 
        jwt.verify(token, `${process.env.SECRET_KEY}`, async (err, decoded) => {
            if (err) {
                console.log(err);
                return response.status(401).send({
                    message: "Auth failed",
                    success: false,
                });
            } else {
                try {
                    const trainers = await Trainer.find({});
                    res.status(200).send({
                        message: "Trainers fetched successfully",
                        success: true,
                        data: trainers,
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
        return response.status(401).send({
            message: "Auth failed",
            success: false,
        });
    }
}

//getting all the approved trainers list
export const getAllApprovedTrainers = async (req, res) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        //authenticationg by jwt token 
        jwt.verify(token, `${process.env.SECRET_KEY}`, async (err, decoded) => {
            if (err) {
                console.log(err);
                return response.status(401).send({
                    message: "Auth failed",
                    success: false,
                });
            } else {
                try {
                    const trainers = await Trainer.find({ status: "approved" });
                    res.status(200).send({
                        message: "Trainers fetched successfully",
                        success: true,
                        data: trainers,
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
        return response.status(401).send({
            message: "Auth failed",
            success: false,
        });
    }
}

//updating the trainer status
export const updateTrainerStatus = async (req, res) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        //authenticationg by jwt token 
        jwt.verify(token, `${process.env.SECRET_KEY}`, async (err, decoded) => {
            if (err) {
                console.log(err);
                return response.status(401).send({
                    message: "Auth failed",
                    success: false,
                });
            } else {
                try {
                    const { trainerId, status } = req.body;
                    const trainer = await Trainer.findByIdAndUpdate(trainerId, {
                        status,
                    });

                    const user = await User.findOne({ _id: trainer.userId });
                    user.isTrainer = status === "approved" ? true : false;
                    await user.save();
                    res.status(200).send({
                        message: "Trainer status updated successfully",
                        success: true,
                        data: trainer,
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
        return response.status(401).send({
            message: "Auth failed",
            success: false,
        });
    }
}

//adding all the appointments by the user id
export const getAllAppointmentsbyUserId = async (req, res) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        //authenticationg by jwt token 
        jwt.verify(token, `${process.env.SECRET_KEY}`, async (err, decoded) => {
            if (err) {
                console.log(err);
                return response.status(401).send({
                    message: "Auth failed",
                    success: false,
                });
            } else {
                try {
                    const appointments = await Appointments.find({ userId: decoded.id });
                    res.status(200).send({
                        message: "Appointments fetched successfully",
                        success: true,
                        data: appointments,
                    });
                } catch (error) {
                    console.log(error);
                    res.status(500).send({
                        message: "Error fetching appointments",
                        success: false,
                        error,
                    });
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

