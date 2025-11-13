const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("./../models/User")
const password = require("./../models/Password")
const fetchPasswordServices = require("../services/fetchPassowrd")
const Router = express.Router();
Router.use(cookieParser());
Router.use(express.json());
Router.get("/fetchPassword", isLoggedIn, (req, res) => {
    try {
        fetchPasswordServices();
        res.status(200).json({ message: `Saved Password are Fetched`, success: true, passwords: passes.savedPassword });
    } catch (error) {
        return res.status(500).json({ error: `Internal Server Error` });
    }
});

function isLoggedIn(req, res, next) {
    if (req.cookies == "")
        return res.status(400).json({ error: `You Must Log In First` })
    const data = jwt.verify(req.cookies.userLogged, process.env.JWT_SECRET);
    req.user = data;
    next();
}

module.exports = Router;