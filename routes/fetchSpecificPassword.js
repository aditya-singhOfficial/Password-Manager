const express = require("express")
const passDb = require("./../models/Password")
const Router = express.Router();
const cookieParser = require("cookie-parser");
Router.use(cookieParser());
Router.use(express.json());
Router.get("/fetchOnePassword/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);

        const passwordData = await passDb.findOne({ _id: id });
        console.log(passwordData);
        res.status(200).json({ message: `Data Fetched`, password: passwordData });

    } catch (error) {
        res.status(500).json({ error: `Internal Server Error`, success: false })
    }

})

module.exports = Router;