import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout.js";
import { Button, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DatePicker, TimePicker } from 'antd';
import "./bookAppointment.scss";

// function to book appointments for user and send requests to the trainer
function BookAppointment() {
    const [isAvailable, setIsAvailable] = useState(false);
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    //using redux Store user details are fetched
    const { user } = useSelector((state) => state.user);
    const [trainer, setTrainer] = useState(null);
    const params = useParams();

    const getTrainerData = async () => {
        try {
            // API call to get all the details of the Trainer by the userId
            const response = await axios.post(
                "http://localhost:9001/trainer/trainerInfoById",
                {
                    trainerId: params.trainerId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                setTrainer(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // API call being made to check the trainer availability in the user selected timings 
    const checkAvailability = async () => {
        try {
            const response = await axios.post(
                "http://localhost:9001/user/check-booking-availability",
                {
                    trainerId: params.trainerId,
                    Date: date,
                    time: time,

                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                setIsAvailable(true);
            } else {
                toast.error(response.data.message);
                setIsAvailable(false);
            }
        } catch (error) {
            toast.error("Error booking appointment");
        }
    }

    //If the trainer is available, the following method will be called 
    // and button will be visible and sends the request to the selected trainer
    const bookNow = async () => {
        try {
            const response = await axios.post(
                "http://localhost:9001/user/book-appointment",
                {
                    trainerId: params.trainerId,
                    userId: user._id,
                    trainerInfo: trainer,
                    UserInfo: user,
                    Date: date,
                    time: time,

                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error("Error booking appointment");
        }
    }

    //fetched the trainer data by API call
    useEffect(() => {
        getTrainerData();
    }, []);


    return (
        <Layout>
            {trainer && (
                <div>
                    {/* displays the basic Trainer info  */}
                    <div class="trainerlist-contents-appt">
                        <h1 className="card-title">
                            {trainer.firstName} {trainer.lastName}
                        </h1>

                        <p>
                            <b>Phone Number : </b>
                            {trainer.phoneNumber}
                        </p>
                        <p>
                            <b>Address : </b>
                            {trainer.address}
                        </p>
                        <p>
                            <b>Specialization : </b>
                            {trainer.specialization}
                        </p>
                        <p>
                            <b>Years of Experience : </b>
                            {trainer.experience}
                        </p>

                        <p>
                            <b>Fee per Visit : </b>
                            {trainer.feePerConsultation}
                        </p>
                        <p>
                            <b>Timings : </b>
                            {trainer.timings[0]} - {trainer.timings[1]}
                        </p>
                    </div>
                    <div>
                        {/* antd row and col used to arrange the data in the format */}
                        <Row gutter={8}>
                            <Col span={8}>
                                <div class="booking-cards">
                                    <div class="booking-contents-1">
                                        <DatePicker format='MM-DD-YYYY' onChange={(value) => {
                                            setDate((value).format("MM-DD-YYYY"));
                                            setIsAvailable(false);
                                        }} />
                                    </div >
                                </div>
                            </Col>
                            {/* //displaying the timings for the user to select */}
                            <Col span={8}>
                                <div class="booking-cards-2">
                                    <div class="booking-contents-2">
                                        <TimePicker format='HH:mm' onChange={(value) => {
                                            setIsAvailable(false);
                                            setTime(
                                                (value.format('HH:mm')),

                                            );
                                        }} />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            {/* Checks the availablity of the user */}
                            <Col span={8}>
                                <div class="booking-cards">
                                    <div class="booking-contents-1">
                                        <Button onClick={checkAvailability}>Check Availability</Button>
                                    </div>
                                </div>
                            </Col>
                            <Col span={8}>
                                {/* Sends the request to accept session to the trainer and status as pending */}
                                <div class="booking-cards-2">
                                    <div class="booking-contents-2 booknow">
                                        {isAvailable && (<Button onClick={bookNow}>Book Now</Button>)}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            )}
        </Layout>
    )
}

export default BookAppointment;