const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../schema/userSchema");

router.get("/:id",(req,res,next) => {

    var payload = {
        pageTitle : "View Post",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
        postId : req.params.id
    }

    res.status(200).render("postPage",payload);               //talking about login.pug
});

module.exports = router;