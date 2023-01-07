import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import Layout from "../Components/Layout.js";
import { toast } from 'react-hot-toast'
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

// function to see appointments for user
function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();
    //Fetches all the pending/approved sessions info through the API call
    const getAppointmentsData = async () => {
        try {
            const resposne = await axios.get("http://localhost:9001/appt/get-appointments-by-userId", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (resposne.data.success) {
                setAppointments(resposne.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAppointmentsData();
    }, []);
    //Colums used for displaying the data and dataIndex used 
    // for setting the data according to the recieved response from the backend
    const columns = [
        {
            title: "ID",
            dataIndex: "_id",

        },
        {
            title: "Trainer",
            dataIndex: "name",
            render: (text, record) => (
                <span>
                    {record.trainerInfo.firstName} {record.trainerInfo.lastName}
                </span>
            ),
        },
        {
            title: "Phone",
            dataIndex: "phoneNumber",
            render: (text, record) => (
                <span>
                    {record.trainerInfo.phoneNumber}
                </span>
            ),
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            render: (record, text) => (
                <span>
                    {moment(record.date).format("MM-DD-YYYY")}
                    {moment(record.time).format("HH:mm")}
                </span>
            ),
        },
        {
            title: "Status",
            dataIndex: "Status",
        },

    ];
    return (
        <Layout>
            <h1 className="page-header">Appointments List</h1>
            <hr />
            {/*Displays all the scheduled sessions of the user/trainer */}
            <Table columns={columns} dataSource={appointments} />
        </Layout>
    )
}

export default Appointments;
