import { Progress } from "antd";
import React from "react";
// functions to analyse the calories intake and outtake
function Analatics({ calories }) {
    if (calories == null) {
        console.log(`ji`);
    }
    //Total calories fetched after applying the filters
    const totalCalories = calories?.length;
    console.log(totalCalories);
    const totalCount = Array.isArray(calories)
        ? calories.reduce(
            (acc, transaction) => acc + transaction.calories,
            0
        ) : 0;
        //Total calories count by type food
    const totalFoodCount = Array.isArray(calories)
        ? calories
            .filter((transaction) => transaction.type === "Food")
            .reduce((acc, transaction) => acc + transaction.calories, 0) : 0;
            //Total calories count by type Exercise
    const totalExerciseCount = Array.isArray(calories)
        ? calories
            .filter((transaction) => transaction.type === "Exercise")
            .reduce((acc, transaction) => acc + transaction.calories, 0) : 0;
    console.log(totalCount);
    const categories = [
        "Carbs",
        "Fat",
        "Protein",
        "Cardio",
        "Strength",
        "Other",
    ];

    return (
        <div className="analytics">

            <div className="row">
                <div className="col-md-6">
                <h4 className="" >Food Intake - Category Wise</h4>
                    {/* Progressive circle to show the category wise analysis of Food Type */}
                    <div className="category-analysis">
                        {categories.map((category) => {
                            const caloriesProgress = Array.isArray(calories)
                                ? calories
                                    .filter((t) => t.type == "Food" && t.category === category)
                                    .reduce((acc, t) => acc + t.calories, 0) : 0;
                            return (
                                caloriesProgress > 0 && <div className="category-card">
                                    <h5 className="">{category}</h5>
                                    <Progress type="circle" strokeColor='#00FF00' percent={((caloriesProgress / totalFoodCount) * 100).toFixed(0)} />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="col-md-6">
                <h4 className="" >Exercise - Category Wise</h4>
                {/* Progressive circle to show the category wise analysis of Exercise Type */}
                    <div className="category-analysis">
                        {categories.map((category) => {
                            const caloriesProg = Array.isArray(calories)
                                ? calories
                                    .filter((t) => t.type == "Exercise" && t.category === category)
                                    .reduce((acc, t) => acc + t.calories, 0) : 0;
                            return (
                                caloriesProg > 0 && <div className="category-card">
                                    <h5 className="">{category}</h5>
                                    <Progress type="circle" strokeColor='#FF0000' percent={((caloriesProg / totalExerciseCount) * 100).toFixed(0)} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analatics;
