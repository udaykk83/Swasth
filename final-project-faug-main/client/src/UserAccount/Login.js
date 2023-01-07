
import React from "react";
import { Button, Form, Input } from "antd";
import "./Signup.scss";
import FormItem from "antd/es/form/FormItem";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Store/alertsSlice.js";
import logo from '../Images/logo-png.png';

//function to login to user account
function Login() {


    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log(values);
        try {
            // axios fetch call for validating the user details
            const response = await axios.post("http://localhost:9001/user/login", values);
            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem("token", response.data.data);
                navigate("/home");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="common-signup">
            {/* form tag from antd used for taking user details to authenticate and redirect to the home screen*/}
            <Form layout="vertical" onFinish={onFinish}>
                <img src={logo}></img>
                <h2>Welcome back to Swasth ;)</h2>
                <FormItem style={{ color: "red" }} label='Email' name='email'>
                    <Input placeholder="Enter your email" />
                </FormItem>
                <FormItem label='Password' name='password'>
                    <Input placeholder="Enter your password" type="password" />
                </FormItem>
                <div className="signuptest">
                    <Link to='/user/signup'>Click here to Sign Up</Link>
                    <Button htmlType="submit">Login</Button>
                </div>

            </Form>
        </div>
    )

}

export default Login;