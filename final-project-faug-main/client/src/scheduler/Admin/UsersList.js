import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../Components/Layout.js";
import { showLoading, hideLoading } from "../../Store/alertsSlice";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import "./users.scss";

// function which shows all the user list
function UsersList() {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    // API call to fetch all trainers data
    const getUsersData = async () => {
        try {
            const resposne = await axios.get("http://localhost:9001/appt/get-all-users", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (resposne.data.success) {
                setUsers(resposne.data.data);
            }
        } catch (error) {
        }
    };

    useEffect(() => {
        getUsersData();
    }, []);

     //colums used as data source to display all the values
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            render: (record, text) => moment(record.createdAt).format("DD-MM-YYYY"),
        },
    ];

    return (
        <Layout>
            <h1 className="page-header">Users List</h1>
            <hr />
            {/* The tbale element is enclosed in teh Layout/ */}
            <Table columns={columns} dataSource={users} />
        </Layout>
    );
}

export default UsersList;