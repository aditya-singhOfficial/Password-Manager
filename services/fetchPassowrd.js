const user = require("../models/User");

const fetchPassword = async (email) => {
    try {
        const passes = await user.findOne({ email }).populate("savedPassword").exec();
        passes.savedPassword.forEach((jsonData) => {
            // console.log(JSON.stringify(jsonData.user));
        })
        return passes;
    } catch (error) {
        console.log(`Failed to fetch passwords`, error);
        throw new Error("Faild to Fetch User")
    }
}

module.exports = fetchPassword;