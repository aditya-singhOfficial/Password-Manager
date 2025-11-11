const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const User = require("../../models/User");
const Router = express.Router();

Router.use(cookieParser());

Router.put("/forget", isLoggedIn, async (req, res) => {
    const { name, email, dateOfBirth, newPassword } = req.body;
    if (!name || !email || !dateOfBirth || !newPassword)
        return res.status(400).json({ error: `Incomplete data`, success: false });
    const emailRegex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailRegex.test(email))
        return res.status(400).json({ error: `Invalid Email`, success: false });
    const userExists = await User.findOne({ email });
    if (!userExists)
        return res.status(400).json({ error: `User Don't Exists`, success: false });
    if (!(userExists.name == name) || !(userExists.dateOfBirth == dateOfBirth))
        return res.status(401).json({ error: `Invalid Credentials`, success: false });
    const hashPass = bcrypt.hash(newPassword, 10);
    userExists.password = await hashPass;
    await userExists.save();
    return res.status(200).json({ message: `Password Frogetted Successfully`, success: true })
})

function isLoggedIn(req, res, next) {
    if (req.cookies == "")
        return res.status(400).json({ error: `You Must Log In First` })
    const data = jwt.verify(req.cookies.userLogged, process.env.JWT_SECRET);
    console.log(data);
    
    req.user = data;
    next();
}

module.exports = Router;