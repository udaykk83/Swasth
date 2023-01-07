import mongoose from 'mongoose';

// this is a model for users where all the data will be added to the "users" database
const Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isTrainer: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);
Schema.virtual('id', () => this._id.toHexString());
Schema.set('toJSON', { virtuals: true });

const userModel = mongoose.model("users", Schema);

export default userModel;