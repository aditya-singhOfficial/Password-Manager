const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    savedPassword: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'password'
        }
    ]
},
    {
        timestamps: true,
    }
);

const user = mongoose.model("user", UserSchema);
module.exports = user;