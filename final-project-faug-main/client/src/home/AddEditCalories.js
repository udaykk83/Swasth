import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from 'axios';
import "./calorie.scss";
import { navigate, useNavigate } from "react-router-dom";
const typeData = ['Food', 'Exercises'];
const categoryData = {
    Food: ['Proteins', 'Carbs', 'fat'],
    Exercises: ['cardio', 'strength', 'swimming'],
};
//function to add calories for users
function AddEditCalorie({ setshowAddEditCalorieModal, showAddEditCalorieModal, getCalories, selectedItemForEdit, setSelectedItemForEdit }) {

    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [categories, setCategories] = useState(categoryData[typeData[0]]);
    const [secondCategory, setSecondCategory] = useState(categoryData[typeData[0]][0]);
    const handleTypeChange = (value) => {
        setCategories(categoryData[value]);
        setSecondCategory(categoryData[value][0]);
    };
    const onSecondCategoryChange = (value) => {
        setSecondCategory(value);
    };

    //Upon Form subission to add or edit the record according the input type 
    const onFinish = async (values) => {
        console.log(values);
        if (selectedItemForEdit) {
            //API call to edit the log
            const response = await axios.post("http://localhost:9001/calorie/edit-calorie-log", {
                payload: {
                    ...values,
                    userid: user._id,
                },
                calId: selectedItemForEdit._id,
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

            if (response.data.success) {
                getCalories();
                toast.success(response.data.message);
                navigate("/home");
            } else {
                toast.error(response.data.message);
            }
        } else {
            //API call to add the log
            const response = await axios.post("http://localhost:9001/calorie/add-calorie-log", {
                ...values,
                userid: user._id,
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

            if (response.data.success) {
                getCalories();
                toast.success(response.data.message);
                navigate("/home");
            } else {
                toast.error(response.data.message);
            }
        }
        setshowAddEditCalorieModal(false);
        setSelectedItemForEdit(null);
    };

    return (
        // FOrm and Modal select features of antd are used to take the input and few free form fields
        <Modal title={selectedItemForEdit ? "Edit Calories" : "Add Calories"}
            open={showAddEditCalorieModal}
            onCancel={() => setshowAddEditCalorieModal(false)}
            footer={false}
        >
            <Form layout="vertical" className="Calorie-form" onFinish={onFinish} initialValues={selectedItemForEdit}>
                <Form.Item label="Type" name='type'>
                    <Select>
                        <Select.Option value="Food">Food</Select.Option>
                        <Select.Option value="Exercise">Exercise</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Category" name='category'>
                    <Select>
                        <Select.Option value="Protein">Protein</Select.Option>
                        <Select.Option value="Carbs">Carbs</Select.Option>
                        <Select.Option value="Fat">Fats</Select.Option>
                        <Select.Option value="Cardio">Cardio</Select.Option>
                        <Select.Option value="Strength">Strength</Select.Option>
                        <Select.Option value="Other">Other</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Calories" name='calories'>
                    <Input type='text'></Input>
                </Form.Item>

                <Form.Item label="Date" name='date'>
                    <Input type='date'></Input>
                </Form.Item>

                <Form.Item label="Description" name='description'>
                    <Input type='text'></Input>
                </Form.Item>
                <div className="div-submit-calories">
                    <Button className="btn-submit-calorie" htmlType="submit">
                        SUBMIT
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}

export default AddEditCalorie;