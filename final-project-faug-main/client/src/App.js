import React from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoute from './Components/PublicRoute.js';
import PrivateRoute from './Components/PrivateRoute.js';
import Login from './UserAccount/Login.js';
import Signup from './UserAccount/Signup.js';
import Home from './home/Home.js';
import ApplyTrainer from './scheduler/ApplyTrainer.js';
import TrainersList from './scheduler/Admin/TrainersList.js';
import UsersList from './scheduler/Admin/UsersList.js';
import FindTrainers from "./scheduler/FindTrainers";
import TrianerProfile from "./scheduler/Trainer/TrainerProfile";
import TrainerSession from "./scheduler/Trainer/TrainerSession";
import BookAppointment from "./scheduler/BookAppointment";
import Appointments from "./scheduler/Appointments.js";


//browse different routes according to the route path 
function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          {/* Public routes are not authenticated */}
          <Route path="user/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="user/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          {/* Private routes are authenticated by session token */}
          <Route path="home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="apply-trainer" element={<PrivateRoute><ApplyTrainer /></PrivateRoute>} />
          <Route path="admin/trainerslist" element={<PrivateRoute><TrainersList /></PrivateRoute>} />
          <Route path="admin/userslist" element={<PrivateRoute><UsersList /></PrivateRoute>} />
          <Route path="find-trainers" element={<PrivateRoute><FindTrainers /></PrivateRoute>} />
          <Route path="trainer/profile/:userId" element={<PrivateRoute><TrianerProfile /></PrivateRoute>} />
          <Route path="trainer/sessions" element={<PrivateRoute><TrainerSession /></PrivateRoute>} />
          <Route path="book-appointment/:trainerId" element={<PrivateRoute><BookAppointment /></PrivateRoute>} />
          <Route path="appt/get-appointments-by-userId" element={<PrivateRoute><Appointments /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
