import mongoose from "mongoose";

const connect=async()=>mongoose.connect(process.env.MONGO_URL)

export default connect;