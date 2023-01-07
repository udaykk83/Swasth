
import React from "react";
import { Button, Form, Input } from "antd";
import "./Signup.scss";
import FormItem from "antd/es/form/FormItem";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import logo from '../Images/logo-png.png';
//function to register user
function Register() {

    //navigate used to navigate the given screen after operations
    const navigate = useNavigate();

    //on finish to signup for the user in the platform
    const onFinish = async (values) => {
        console.log(values);
        try {
            //axios fetch call for registering the user
            const response = await axios.post("http://localhost:9001/user/signup", values);
            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/user/login");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="common-signup">
            {/* form tag from antd used for taking user details */}
            <Form layout="vertical" onFinish={onFinish}>
                <img src={logo}></img>
                <h2> Welcome to Swasth :)</h2>
                <FormItem label='Name' name='name'>
                    <Input placeholder="Enter your name" />
                </FormItem>
                <FormItem label='Email' name='email'>
                    <Input placeholder="Enter your email" />
                </FormItem>
                <FormItem label='Password' name='password'>
                    <Input placeholder="Enter your password" type="password" />
                </FormItem>
                <div className="signuptest">
                    <Link to='/user/login'>Click here to login</Link>
                    <Button htmlType="submit">Sign up</Button>
                </div>

            </Form>
        </div>
    )

}

export default Register;