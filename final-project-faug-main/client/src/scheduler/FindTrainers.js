import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Row } from "antd";
import Layout from "../Components/Layout.js";
import { toast } from 'react-hot-toast'
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import Trainer from "../Components/Trainer.js";
import "./bookAppointment.scss";


//function to find all availabletrainers 
function FindTrainers() {
  const [trainers, setTrainers] = useState([]);
  const dispatch = useDispatch();
  const getTrainersData = async () => {
    try {
      // using axios API call to the server for all approved trainers
      const response = await axios.get("http://localhost:9001/appt/get-all-approved-trainers", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.success) {
        setTrainers(response.data.data);
      }
    } catch (error) {

    }
  };

  useEffect(() => {
    getTrainersData();
  }, []);
  return (
    <Layout>
      <Row gutter={20}>
        {/* Of all the trainers fetched using map adding the Trainer details using Trainer.js import  */}
        {trainers.map((trainer) => (
          <Col span={8} xs={24} sm={24} lg={8} >
            <Trainer trainer={trainer} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default FindTrainers;