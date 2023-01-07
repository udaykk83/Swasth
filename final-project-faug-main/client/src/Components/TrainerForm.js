import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import moment from "moment";
import React from "react";
import "./trainerForm.scss";

//Apply trainer form
// using Form enclosed in the row and col tags by the atd 
// and on submission can be used to add or update the trainer info
//  and is used to display in the UI
function TrainerForm({ onFinish, initivalValues }) {
    return (
        <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
                ...initivalValues,
                ...(initivalValues && {
                    timings: [
                        moment(initivalValues?.timings[0], "HH:mm"),
                        moment(initivalValues?.timings[1], "HH:mm"),
                    ],
                }),
            }}
        >
            <div className="form-headers">
                <h2 className="form-header-name-1">Enter Personal Information</h2>
                <h2 className="form-header-name-2">Enter Professional Information</h2>
            </div>
            <Row gutter={24}>

                <Col span={10}>
                    <div className="profile-info-div">
                        <Form.Item
                            required
                            label="First Name"
                            name="firstName"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="First Name" />
                        </Form.Item>
                    </div>
                </Col>
                <Col span={10}>
                    <div className="profile-info-div-2 ">
                        <Form.Item
                            required
                            label="Specialization"
                            name="specialization"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Specialization" />
                        </Form.Item>
                    </div>
                </Col>
                <Col span={10} >
                    <div className="profile-info-div">
                        <Form.Item
                            required
                            label="Last Name"
                            name="lastName"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Last Name" />
                        </Form.Item>
                    </div>
                </Col>
                <Col span={10} >
                    <div className="profile-info-div-2">
                        <Form.Item
                            required
                            label="Experience"
                            name="experience"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Experience" type="number" />
                        </Form.Item>
                    </div>
                </Col>


                <Col span={10} >
                    <div className="profile-info-div">
                        <Form.Item
                            required
                            label="Phone Number"
                            name="phoneNumber"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Phone Number" />
                        </Form.Item>
                    </div>
                </Col>
                <Col span={10} >
                    <div className="profile-info-div-2">
                        <Form.Item
                            required
                            label="Fee Per Consultation"
                            name="feePerConsultation"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Fee Per Consultation" type="number" />
                        </Form.Item>
                    </div>
                </Col>

                <Col span={10} >
                    <div className="profile-info-div">
                        <Form.Item
                            required
                            label="Address"
                            name="address"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Address" />
                        </Form.Item>
                    </div>
                </Col>
                <Col span={10} >
                    <div className="profile-info-div-2">
                        <Form.Item
                            required
                            label="Timings"
                            name="timings"
                            rules={[{ required: true }]}
                        >
                            <TimePicker.RangePicker format="HH:mm" />
                        </Form.Item>
                    </div>
                </Col>

            </Row>

            <div className="trainer-form-submit-div">
                <Button className="trainerinfo-check" htmlType="submit">
                    SUBMIT
                </Button>
            </div>
        </Form>
    );
}

export default TrainerForm;