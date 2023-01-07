import React, { useState } from "react";
import "./layout.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from '../Images/logo1.png';
import bg from '../Images/bg11.png';


function Layout({ children }) {

    const { user } = useSelector((state) => state.user);

    const navigate = useNavigate();
    //menus that are used in the application

    //menu for the user
    const userMenu = [
        {
            name: "Home",
            path: "/home",
        },
        {
            name: "FindTrainers",
            path: "/find-trainers",
        },
        {
            name: "Appointments",
            path: "/appt/get-appointments-by-userId",
        },
        {
            name: "ApplyTrainer",
            path: "/apply-trainer",
        }
    ];

    //menu for the trainer
    const trainerMenu = [
        {
            name: "Home",
            path: "/home",
        },
        {
            name: "Sessions",
            path: "/trainer/sessions",
        },
        {
            name: "Profile",
            path: `/trainer/profile/${user?._id}`,
        },
    ];


    //menu for the admin
    const adminMenu = [
        {
            name: "Home",
            path: "/home",
        },
        {
            name: "Users",
            path: "/admin/userslist",
        },
        {
            name: "Trainers",
            path: "/admin/trainerslist",
        },
    ];

    const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isTrainer ? trainerMenu : userMenu;
    const role = user?.isAdmin ? "Admin" : user?.isTrainer ? "Trainer" : "User";

    return (

        //main class where the main page layout is present
        <div className="main">
                {/* <img className="background-img" src={bg}></img> */}
                <div className="header">
                    <div className="sidebar-header">
                        <img className="sh-row" src={logo}></img>
                        <p className="sh-row">SWASTH</p>
                        {/* <h1 className="role">{role}</h1> */}
                        
                    </div>

                {/* Menus are rendered dynamically according the login user */}
                <div className="menu">
                    {menuToBeRendered.map((menu) => {
                        return (
                            <div className="menu-icons">
                                <i className={menu.icon}></i>
                                <Link to={menu.path}>{menu.name}</Link>
                            </div>
                        );
                    })}
                </div>
                {/* logout functionality to exit from the application/ */}
                <div className="logout-div"
                    onClick={() => {
                        localStorage.clear();
                        navigate("/user/login");
                    }}
                >
                    <button className="btn btn-info btn-lg glyphicon glyphicon-log-out logout-button"><Link to="/user/login">'Logout</Link></button>

                </div>
            </div>

            <div className="body">{children}</div>
        </div>
    )
}

export default Layout;