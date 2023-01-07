import mongoose from 'mongoose';

/* Below is the model for appointment booking where all these values will be added to the database "appointment" */
const appointmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required : true
    },
    trainerId: {
        type: String,
        required : true
    },
    trainerInfo: {
        type: Object,
        required : true
    },
    UserInfo: {
        type: Object,
        required : true
    },
    Date: {
        type: String,
        required : true
    },
    time: {
        type: String,
        required : true
    },
    Status: {
        type: String,
        required : true,
        default: "Pending"
    },

   


}, {
    timestamps : true,
});
appointmentSchema.virtual('id', () => this._id.toHexString());
appointmentSchema.set('toJSON', { virtuals: true });
const appointmentModel = mongoose.model("appointment", appointmentSchema);


export default appointmentModel;
