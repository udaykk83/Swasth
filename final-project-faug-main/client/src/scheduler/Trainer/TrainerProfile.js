import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import TrainerForm from "../../Components/TrainerForm.js";

// function which updated the trainer details
function TrainerProfile() {
    const { user } = useSelector((state) => state.user);
    const params = useParams();
    const [trainer, setTrainer] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //API call to update the trainer profile if timings or any trainer info changes
    const onFinish = async (values) => {
        try {
            //console.log(values);
            const response = await axios.post("http://localhost:9001/trainer/updateTrainerProfile",
                {
                    ...values,
                    userId: user._id,
                    timings: [
                        moment(values.timings[0]).format("HH:mm"),
                        moment(values.timings[1]).format("HH:mm"),
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

    //Get the Trainer info by user id
    const getTrainerData = async () => {
        try {
            const response = await axios.post(
                "http://localhost:9001/trainer/trainerInfoByUserId",
                {
                    userId: params.userId,
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

    useEffect(() => {
        getTrainerData();
    }, []);
    return (
        <Layout>
            <h1 className="page-title">Update My Profile</h1>
            <hr />
            {/* If trainer exists fetch the data and display using the TrainerForm element */}
            {trainer && <TrainerForm onFinish={onFinish} initivalValues={trainer} />}
        </Layout>
    );
}

export default TrainerProfile;