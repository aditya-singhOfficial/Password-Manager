const jwt = require("jsonwebtoken")

function isLoggedIn(req, res, next) {

    if (!req.cookies || req.cookies.userLogged === "")
        return res.redirect("/")
    const data = jwt.verify(req.cookies.userLogged, process.env.JWT_SECRET);

    req.user = data;
    next();
}

module.exports = isLoggedIn;
