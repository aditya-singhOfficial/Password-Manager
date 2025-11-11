const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("./../models/User")
const password = require("./../models/Password")
const Router = express.Router();
Router.use(cookieParser());
Router.use(express.json());
Router.get("/fetchPassword/:id", isLoggedIn, async (req, res) => {
    try {
        const { id, email } = req.user;
        const passes = await User.findOne({ email }).populate("savedPassword").exec();
        passes.savedPassword.forEach((jsonData) => {
            console.log(jsonData);
        })
        res.status(200).json({ message: `Saved Password are Fetched`, success: true });
    } catch (error) {
        console.log(`Failed to fetch passwords`, error);
        return res.status(500).json({ error: `Internal Server Error` });
    }
});

function isLoggedIn(req, res, next) {
    if (req.cookies == "")
        return res.status(400).json({ error: `You Must Log In First` })
    const data = jwt.verify(req.cookies.userLogged, process.env.JWT_SECRET);
    console.log(data);

    req.user = data;
    next();
}

module.exports = Router;