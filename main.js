const express = require("express");
const connectToDB = require("./config/mongoose.js")
const dotenv = require("dotenv");

const app = express();
dotenv.config();
connectToDB();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("Working");
})

app.listen(8000, (err) => {
    console.log("App is listeaning at ", PORT);
})