import mongoose from "mongoose";

const userModal = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    age: {
        type: Number
    }
}, { timestamps: true })

export default mongoose.model("User", userModal);