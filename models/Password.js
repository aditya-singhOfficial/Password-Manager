const mongoose = require("mongoose");

const PasswordSchema = mongoose.Schema({
    siteName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.type.ObjectId,
        ref: user
    }
})

const password = mongoose.model("password", PasswordSchema);

module.exports = password;