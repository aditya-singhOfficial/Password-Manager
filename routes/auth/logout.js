const express = require("express");
const Router = express.Router();

Router.get("/logout", (req, res) => {
    res.cookie("userLogged", "");
    res.status(200).json({ message: `User Logged Out`, success: true })
})  

module.exports = Router;