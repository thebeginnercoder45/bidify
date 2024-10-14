import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        const connIns = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`Database is connected, Host: ${connIns.connection.host}`);
    } catch (error) {
        console.log("Failed while connecting database");
        console.log(error);
        process.exit(1)
    }
}

export default connectToDb;