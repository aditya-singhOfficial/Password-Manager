const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const User = require("../../models/User")

const Router = express.Router();
Router.use(cookieParser())

Router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res
                .status(400)
                .json({ error: `Incomplete Request`, success: false });
        const userExists = await User.findOne({ email });
        if (!userExists)
            return res
                .status(400)
                .json({ error: `User don't exists`, success: false });

        const isValid = await bcrypt.compare(password, userExists.password);

        if (!isValid)
            return res
                .status(401)
                .json({ error: `Invalid Credentials`, success: false })

        const jwtToken = await jwt.sign({ id: userExists._id, email }, process.env.JWT_SECRET, { expiresIn: "1d" })
        res.cookie("userLogged", jwtToken);
        res.status(200)
            .json({
                message: `User LogedIN Successfulyy`, success: true, user: {
                    id: userExists._id,
                    name: userExists.name,
                    email: userExists.email
                }, jwtToken
            })
    } catch (error) {
        res.status(500).json({ error: `Internal Server Error`, success: false })
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