import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected db")
    } catch (error) {
        console.error("someting went wrong", error)
    }
}

export default connectDB;