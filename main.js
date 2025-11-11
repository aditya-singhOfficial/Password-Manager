const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const connectToDB = require("./config/mongoose.js")
const registerRoute = require("./routes/auth/register.js")
const loginRoute = require("./routes/auth/login.js")
const forgetRoute = require("./routes/auth/forget.js")
const app = express();
dotenv.config();
connectToDB();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.get("/", (req, res) => {
    res.send("Working");
})

app.use("/api/auth", registerRoute);
app.use("/api/auth", loginRoute);
app.use("/api/auth", forgetRoute);

app.listen(8000, (err) => {
    console.log("App is listeaning at ", PORT);
})