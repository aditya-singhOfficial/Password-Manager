const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        if (!mongoose.connections[0].readyState) {
            await mongoose.connect(process.env.MONGO_URI);
            console.log("Connected To DB");
        }
        console.log("DB already Connected");
        return;
    } catch (error) {
        console.log("Failed To Connect with the DB");
        
    }

}

module.exports= connectToDB;