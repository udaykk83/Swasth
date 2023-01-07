import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./trainer.scss";

//Trainer lists form used while browsing the Trainers by the user
function Trainer({ trainer }) {
  const navigate = useNavigate();
  return (
    <div class="trainerlist-cards"
      onClick={() => navigate(`/book-appointment/${trainer._id}`)}
    >
      <div class="trainerlist-contents">
        <h1>
          {trainer.firstName} {trainer.lastName}
        </h1>
        <p>
          <b>Specialization : </b>
          {trainer.specialization}
        </p>
        <p>
          <b>Years of Experience : </b>
          {trainer.experience}
        </p>
        <Button className="trainerinfo-check">Check Timings & Fees</Button>

      </div>

    </div>
  );
}

export default Trainer;

