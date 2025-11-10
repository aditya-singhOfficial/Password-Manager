const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../../models/User");

Router.use(express.json());
Router.use(express.urlencoded({ extended: true }));

Router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log({ name, email, password });

        if (!name || !email || !password)
            return res
                .status(400)
                .json({ error: `Incomplete Request`, success: false })


        const emailRegex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (!emailRegex.test(email))
            return res
                .status(400)
                .json({ error: `Invalid Email!`, success: false })
        const userExists = await User.findOne({ email });


        if (userExists)
            return res
                .status(400)
                .json({ error: `User already exists`, success: false })
        const hash = await bcrypt.hash(password, 10);
        const payload = {
            email,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
        res.cookie("UserID", token);
        const newUser = await User.create({
            name,
            email,
            password: hash
        });

        return res.status(201).json({ message: `User Registered Successfully`, success: true, newUser });
    } catch (error) {
        console.log(`Failed to create a user`, error);
        return res.status(500).json({ error: `Internal Server Error` });
    }
})

module.exports = Router;