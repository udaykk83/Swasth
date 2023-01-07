import Trainer from '../models/trainer.js';
import AppointmentModel from '../models/appointmentModel.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//getting the trainer information by the user id
export const getTrainerInfoByUserId = async (req, response) => {
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
                    const trainer = await Trainer.findOne({ userId: req.body.userId });
                    if (!trainer) {
                        return response
                            .status(200)
                            .send({ message: "Trainer does not exist", success: false });
                    } else {
                        return response.status(200).send({
                            success: true,
                            data: trainer,
                            message: "Trainer info fetched successfully",
                        });
                    }
                } catch (error) {
                    response
                        .status(500)
                        .send({ message: "Error getting trainer info", success: false, error });
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

//fetching the trainer information by the user id
export const getTrainerInfoById = async (req, response) => {
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
                    const trainer = await Trainer.findOne({ _id: req.body.trainerId });
                    if (!trainer) {
                        return response
                            .status(200)
                            .send({ message: "Trainer does not exist", success: false });
                    } else {
                        return response.status(200).send({
                            success: true,
                            data: trainer,
                            message: "Trainer info fetched successfully",
                        });
                    }
                } catch (error) {
                    response
                        .status(500)
                        .send({ message: "Error getting trainer info", success: false, error });
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

//updating the trainer profile
export const updateTrainerProfile = async (req, response) => {
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
                    const trainer = await Trainer.findOneAndUpdate(
                        { userId: req.body.userId },
                        req.body
                      );
                    if (!trainer) {
                        return response
                            .status(200)
                            .send({ message: "Trainer does not exist", success: false });
                    } else {
                        return response.status(200).send({
                            success: true,
                            data: trainer,
                            message: "Trainer info updated successfully",
                        });
                    }
                } catch (error) {
                    response
                        .status(500)
                        .send({ message: "Error getting trainer info", success: false, error });
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

// displaying sessions of the trainer by id
export const getSessionsByTrainerId = async (req, response) => {
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

                    const trainer = await Trainer.findOne({ userId: decoded.id });                    
                    const sessions = await AppointmentModel.find({ trainerId: trainer._id });

                    if (!trainer) {
                        return response
                            .status(200)
                            .send({ message: "Trainer does not exist", success: false });
                    } else {
                        return response.status(200).send({
                            success: true,
                            data: sessions,
                            message: "Sessions fetched successfully",
                        });
                    }
                } catch (error) {
                    response
                        .status(500)
                        .send({ message: "Error getting Session info", success: false, error });
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
//ypdating the session status
export const changeSessionStatus = async (req, response) => {
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
                    const { appointmentId, Status } = req.body;
                    console.log(appointmentId);
                    console.log(Status);
                    const appointment = await AppointmentModel.findByIdAndUpdate(appointmentId, {
                    Status,
                    });
                    if (!appointment) {
                        return response
                            .status(200)
                            .send({ message: "Appointment does not exist", success: false });
                    } else {
                        return response.status(200).send({
                            success: true,
                            message: "Session info updated successfully",
                        });
                    }
                } catch (error) {
                    response
                        .status(500)
                        .send({ message: "Error getting session info", success: false, error });
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

