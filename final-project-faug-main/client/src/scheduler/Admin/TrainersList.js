import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../Components/Layout.js";
import { showLoading, hideLoading } from "../../Store/alertsSlice";
import { toast } from 'react-hot-toast'
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

//function to get all trainers and approve them 
function TrainersList() {
    const [trainers, setTrainers] = useState([]);
    const dispatch = useDispatch();
    // API call to fetch all trainers data
    const getTrainersData = async () => {
        try {
            const resposne = await axios.get("http://localhost:9001/appt/get-all-trainers", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (resposne.data.success) {
                setTrainers(resposne.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // API call to change the trainer status
    const changeTrainerStatus = async (record, status) => {
        try {
            const resposne = await axios.post(
                "http://localhost:9001/appt/update-trainer-status",
                { trainerId: record._id, userId: record.userId, status: status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (resposne.data.success) {
                toast.success(resposne.data.message);
                getTrainersData();
            }
        } catch (error) {
            toast.error('Error updating trainer account status');
        }
    };
    useEffect(() => {
        getTrainersData();
    }, []);

    //colums used as data source to display all the values
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => (
                <span>
                    {record.firstName} {record.lastName}
                </span>
            ),
        },
        {
            title: "Phone",
            dataIndex: "phoneNumber",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            render: (record, text) => moment(record.createdAt).format("DD-MM-YYYY"),
        },
        {
            title: "status",
            dataIndex: "status",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="">
                    {record.status === "pending" && (
                        <h1 className="anchor" onClick={() => changeTrainerStatus(record, "approved")}>
                            Approve
                        </h1>
                    )}
                    {record.status === "approved" && (
                        <h1 className="anchor" onClick={() => changeTrainerStatus(record, "blocked")}>
                            Block
                        </h1>
                    )}
                    {record.status === "blocked" && (
                        <h1 className="anchor" onClick={() => changeTrainerStatus(record, "approved")}>
                            Approve
                        </h1>
                    )}
                </div>
            ),
        },
    ];
    return (
        <Layout>
            {/* The tbale element is enclosed in teh Layout/ */}
            <h1 className="page-header">Trainers List</h1>
            <hr />
            <Table columns={columns} dataSource={trainers} />
        </Layout>
    );
}

export default TrainersList;