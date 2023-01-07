import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from '../Components/Layout.js';
import "./calorie.scss";
import AddEditCalorie from "./AddEditCalories.js";
import toast from "react-hot-toast";
import moment from "moment";
import { DatePicker, Form, message, Select, Table } from "antd";
import Analytics from "./Analytics.js";
const { RangePicker } = DatePicker;
//function which shows the calories until now
function Home() {
    const [showAddEditCalorieModal, setshowAddEditCalorieModal] = useState(false);
    const [caloriesData, setCaloriesData] = useState([]);
    const [frequency, setFrequency] = useState("7");
    const [type, setType] = useState("all");
    const [selectedRange, setSelectedRange] = useState([]);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);

    // API call to fetch all calories of the user including the filters
    const getCalories = async () => {
        try {
            const response = await axios.post("http://localhost:9001/calorie/get-all-calories", {
                frequency,
                ...(frequency === "custom" && { selectedRange }),
                type,
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            if (response.data.success) {
                setCaloriesData(response.data.data);
                // toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
            console.log(caloriesData);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    //delete API call to remove a record
    const deleteCalorieLog = async (record) => {
        try {
            const response = await axios.post("http://localhost:9001/calorie/delete-calorie-log", {
                calId: record._id,
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
            console.log(caloriesData);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
        getCalories();
    };

    useEffect(() => {
        getCalories();
    }, [frequency, selectedRange, type]);

    //columns used in the Table data source to display values
    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
        },
        {
            title: "Calories",
            dataIndex: "calories",
        },
        {
            title: "Category",
            dataIndex: "category",
        },
        {
            title: "Type",
            dataIndex: "type",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => {
                return (
                    <div className="EDbtn">
                        <div onClick={() => {
                            setSelectedItemForEdit(record);
                            setshowAddEditCalorieModal(true);
                        }}>
                            <i class="bi bi-pencil-fill"></i>
                        </div>
                        <div Delete className="mx-3" onClick={() => deleteCalorieLog(record)}>
                            <i class="bi bi-trash-fill"></i>
                        </div>
                    </div>
                );
            },
        },
    ];

    return (
        <Layout>
            <div className="calorie-filter ">
                <div className="filters-home d-flex">
                    {/* Date Filters applied to fetch the data */}
                    <div className="date-filter-home d-flex flex-column">
                        <h6 className="">Select Frequency</h6>
                        <Select value={frequency} onChange={(value) => setFrequency(value)}>
                            <Select.Option value="7">Last 1 Week</Select.Option>
                            <Select.Option value="30">Last 1 Month</Select.Option>
                            <Select.Option value="365">Last 1 Year</Select.Option>
                            <Select.Option value="custom">Custom</Select.Option>
                        </Select>

                        {frequency === "custom" && (
                            <div className="mt-2">
                                <RangePicker
                                    value={selectedRange}
                                    onChange={(values) => setSelectedRange(values)}
                                />
                            </div>
                        )}
                    </div>
                    {/* Type Filters applied to fetch the data */}
                    <div className="date-filter-home flex-column d-flex">
                        <h6 className="">Select Type</h6>
                        <Select value={type} onChange={(value) => setType(value)}>
                            <Select.Option value="all">All</Select.Option>
                            <Select.Option value="Food">Food</Select.Option>
                            <Select.Option value="Exercise">Exercise</Select.Option>
                        </Select>
                    </div>
                </div>

                {/* Button to add a new calorie log  */}
                <div className="add-new-data">
                    <button className="AddNewMeal" onClick={() => setshowAddEditCalorieModal(true)}>ADD</button>
                </div>

            </div>


            <div className="table-analtics">
                {/* To dosplay all the tabular data */}
                <div className="table">
                    <Table columns={columns} dataSource={[...caloriesData] || []} />
                </div>
                {/* To diplay the analytics view */}
                <Analytics calories={[...caloriesData] || []} />
            </div>

            {/* To add the calore log of the user */}
            {showAddEditCalorieModal && (
                <AddEditCalorie
                    showAddEditCalorieModal={showAddEditCalorieModal}
                    setshowAddEditCalorieModal={setshowAddEditCalorieModal}
                    getCalories={getCalories}
                    selectedItemForEdit={selectedItemForEdit}
                    setSelectedItemForEdit={setSelectedItemForEdit}
                />
            )}
        </Layout>
    )
}

export default Home;