import mongoose from 'mongoose';


/* Below is the model for calorie calculation where all these values will be added to the database "calorielog" */
const Schema = new mongoose.Schema(
    {
        userid: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        calories: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: false,
        },
        description: {
            type: String,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);
Schema.virtual('id', () => this._id.toHexString());
Schema.set('toJSON', { virtuals: true });

const calorieModel = mongoose.model("calorielog", Schema);

export default calorieModel;