const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const path = require('path');
const connectToDB = require("./config/mongoose.js")
const registerRoute = require("./routes/auth/register.js")
const loginRoute = require("./routes/auth/login.js")
const forgetRoute = require("./routes/auth/forget.js")
const logoutRoute = require("./routes/auth/logout.js")
const savePasswordRoute = require("./routes/savePassword.js")
const fetchPasswordRoute = require("./routes/fetchPassword.js")
const fetchSpecificPasswordRoute = require("./routes/fetchSpecificPassword.js")
const isLoggedIn = require("./middlewares/isLoggedIN.js")
const fetchPasswordServices = require("./services/fetchPassowrd.js")
const app = express();
dotenv.config();
connectToDB();
app.set('view engine', 'ejs')
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req, res) => {
    res.render("index")
})
app.get("/signup", (req, res) => {
    res.render("signup")
})

app.get("/profile", isLoggedIn, async (req, res) => {

    const userAndPasswords = await fetchPasswordServices(req.user.email)
    // TODO: fetch password from /api/fetchpassword
    res.render("profile", { name: userAndPasswords.name, passwords: userAndPasswords.savedPassword },

    );
})

app.use("/api/auth", registerRoute);
app.use("/api/auth", loginRoute);
app.use("/api/auth", forgetRoute);
app.use("/api/auth", logoutRoute);
app.use("/api", savePasswordRoute);
app.use("/api", fetchSpecificPasswordRoute);
app.use("/api", fetchPasswordRoute);



app.listen(8000, (err) => {
    console.log("App is listeaning at ", PORT);
})