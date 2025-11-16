const express = require("express");
const cookieParser = require("cookie-parser")
const passDb = require("./../models/Password");
const User = require("./../models/User")
const isLoggedIN = require("./../middlewares/isLoggedIN")
const Router = express.Router();
Router.use(express.json());
Router.use(express.urlencoded({ extended: true }))
Router.use(cookieParser());
Router.patch("/editpassword/:id", isLoggedIN, async (req, res) => {
    const passwordId = req.params.id;
    const userId = req.user.id;
    console.log(userId);

    const { siteName, userName, password } = req.body;

    if (!siteName || !userName || !password) {
        return res.status(400).json({ error: `Incomplete Request`, success: false })
    }


    const passAlreadyExsists = await passDb.findOne({ siteName: siteName, userName: userName, password: password, user: userId });


    if (passAlreadyExsists)
        return res.status(400).json({ error: `Username: ${userName} and password: ${password} already Exists For ${siteName}`, success: false })

    const updatedPassword = await passDb.findOneAndUpdate({ _id: passwordId }, {
        userName,
        password
    }, { new: true })
    console.log(updatedPassword);

    return res.status(200).json({ message: `Password edited successfully`, success: true, password: updatedPassword })
})

module.exports = Router;