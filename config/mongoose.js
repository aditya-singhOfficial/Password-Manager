const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            console.log("Already connected to database");
            return;
        }
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected Successfully");

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }

}

module.exports = connectToDB;