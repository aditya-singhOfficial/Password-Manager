const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser");
const User = require("./../models/User")
const PasswordModel = require("./../models/Password")
const Router = express.Router();
Router.use(cookieParser());
Router.use(express.json());
Router.post("/savePassword/:id", isLoggedIn, async (req, res) => {
    try {
        const { siteName, userName, password } = req.body;
        const { id, email } = req.user;
        if (!siteName || !userName || !password)
            return res.status(400).json({ error: `Incomplete Request`, success: false })

        const userNameAlreadyExists = await PasswordModel.findOne({ userName });

        if (userNameAlreadyExists && siteName == userNameAlreadyExists.siteName)
            return res.status(400).json({ error: `This password for ${userName} already exists in DB`, success: false })

        const hashPass = await bcrypt.hash(password, 10);

        const passDb = await PasswordModel.create({
            siteName,
            userName,
            password: hashPass,
            user: id
        })

        const userExists = await User.findOne({ email });
        userExists.savedPassword.push(passDb._id);

        userExists.save();

        return res.status(200).json({ message: `Password Saved Successfully`, success: true, USER: userExists, Password: passDb })
    } catch (error) {
        console.log(`Failed to save a password`, error);
        return res.status(500).json({ error: `Internal Server Error` });
    }
})

function isLoggedIn(req, res, next) {
    if (req.cookies == "")
        return res.status(400).json({ error: `You Must Log In First` })
    const data = jwt.verify(req.cookies.userLogged, process.env.JWT_SECRET);

    req.user = data;
    next();
}

module.exports = Router;