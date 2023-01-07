import calorieModel from '../models/calorie.js';
import jwt from 'jsonwebtoken';
import moment from "moment";


//getting all the calories by the user ID
export const getAllCalories = async (req, res) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        //authenticationg by jwt token 
        jwt.verify(token, `${process.env.SECRET_KEY}`, async (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).send({
                    message: "Auth failed",
                    success: false,
                });

            } else {
                try {
                    // filters applied and type of the filter data is fetched
                    const { frequency, selectedRange, type } = req.body;
                    const calories = await calorieModel.find({
                        ...(frequency !== "custom"
                            ? {
                                date: {
                                    $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
                                },
                            }
                            : {
                                date: {
                                    $gte: selectedRange[0],
                                    $lte: selectedRange[1],
                                },
                            }),
                        userid: decoded.id,
                        ...(type !== 'all' && { type })
                    });
                    res.status(200).send({
                        message: "Calories fetched successfully",
                        success: true,
                        data: calories,
                    });
                } catch (error) {
                    console.log(error);
                    res.status(500).send({
                        message: "Error fetching all calories",
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

//adding the calories to the calorie log
export const addCalorieLog = async (req, res) => {
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
                    //saving the new record by userId
                    const calorie = new calorieModel(req.body);
                    await calorie.save();
                    res.status(200).send({
                        message: "Calories added successfully",
                        success: true,
                        data: calorie,
                    });
                } catch (error) {
                    console.log(error);
                    res.status(500).send({
                        message: "Error adding calories",
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

//delete used to delete calories from the table
export const deleteCalorieLog = async (req, res) => {
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
                    await calorieModel.findOneAndDelete({ _id: req.body.calId })
                    res.status(200).send({
                        message: "Calories Deleted successfully",
                        success: true,
                    });
                } catch (error) {
                    console.log(error);
                    res.status(500).send({
                        message: "Error Deleting calories",
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

//update used to update the calories in the table
export const editCalorieLog = async (req, res) => {
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
                    await calorieModel.findOneAndUpdate({ _id: req.body.calId }, req.body.payload)
                    res.status(200).send({
                        message: "Calories Updated successfully",
                        success: true,
                    });
                } catch (error) {
                    console.log(error);
                    res.status(500).send({
                        message: "Error Updating calories",
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
