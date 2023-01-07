import React from "react";
import Layout from "../Components/Layout.js";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../Store/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TrainerForm from "../Components/TrainerForm.js";
import moment from "moment";
import "./bookAppointment.scss";

// function to apply for trainer
function ApplyTrainer() {
    const dispatch = useDispatch();
    //using redux Store user details are fetched
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            //console.log(values);
            //console.log(values.timings[0]);
            //console.log((values.timings[0]).format("HH:mm"));
            //API for user to apply for the trainer position 
            const response = await axios.post("http://localhost:9001/user/apply-trainer",
                {
                    ...values,
                    userId: user._id,
                    timings: [
                        values.timings[0].format("HH:mm"),
                        values.timings[1].format("HH:mm"),
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/home");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout>
            <h1 className="page-title">Apply Trainer</h1>
            <hr />
            {/* Displays the Trainer Form with the fetched values */}
            <TrainerForm onFinish={onFinish} />
        </Layout>
    );
}

export default ApplyTrainer;
