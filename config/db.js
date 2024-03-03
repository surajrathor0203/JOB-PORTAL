import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`conneted to mongoDB database ${mongoose.connection.host}`.bgMagenta.white);

    } catch (error) {
        console.log(`mongoDB error ${error}`.bgRed.white)

    }
};

export default connectDB;