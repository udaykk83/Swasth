import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../Components/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
//function to get sessions booked for trainer
function TrainerSession() {
  const [sessions, setSessions] = useState([]);
  const dispatch = useDispatch();
  //Fetches all the sessions in every status associated to the Trainer ID
  const getSessionsData = async () => {
    try {
      const resposne = await axios.get(
        "http://localhost:9001/trainer/getSessionsByTrainerId",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (resposne.data.success) {
        setSessions(resposne.data.data);
      }
    } catch (error) {
    }
  };

  //Trainer can accept or reject the scheduled session 
  const changeSessionStatus = async (record, status) => {
    console.log(record);
    try {
      const resposne = await axios.post(
        "http://localhost:9001/trainer/changeSessionStatus",
        { appointmentId: record._id, Status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (resposne.data.success) {
        toast.success(resposne.data.message);
        record.Status = 'Completed';
        getSessionsData();
      }
    } catch (error) {
      toast.error("Error changing trainer session status");
    }
  };
  //To display the data Antd Table is being used
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Patient",
      dataIndex: "Name",
      render: (text, record) => <span>{record.UserInfo.name}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => <span>{record.trainerInfo.phoneNumber}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}{" "}
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "Status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.Status === "Pending" && (
            <div className="d-flex">
              <h1
                className="anchor px-2"
                onClick={() => changeSessionStatus(record, "approved")}
              >
                Approve
              </h1>
              <h1
                className="anchor"
                onClick={() => changeSessionStatus(record, "rejected")}
              >
                Reject
              </h1>
            </div>
          )}
        </div>
      ),
    },
  ];
  useEffect(() => {
    getSessionsData();
  }, []);
  return (
    <Layout>
      <h1 className="page-header">Sessions</h1>
      <hr />
      <Table columns={columns} dataSource={sessions} />
    </Layout>
  );
}

export default TrainerSession;