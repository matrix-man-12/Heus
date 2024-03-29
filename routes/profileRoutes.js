const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../schema/userSchema");
const { use } = require("./api/posts");

router.get("/",(req,res,next) => {

    var payload = {
        pageTitle : req.session.user.username,
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
        profileUser: req.session.user
    }
    res.status(200).render("profilePage",payload);               //talking about .pug
});


router.get("/:username",async (req,res,next) => {

    var payload = await getPayload(req.params.username,req.session.user);

    res.status(200).render("profilePage",payload);               //talking about .pug
});

router.get("/:username/replies",async (req,res,next) => {

    var payload = await getPayload(req.params.username,req.session.user);
    payload.selectedTab = "replies";
    res.status(200).render("profilePage",payload);               //talking about .pug
});

router.get("/:username/following",async (req,res,next) => {

    var payload = await getPayload(req.params.username,req.session.user);
    payload.selectedTab = "following";
    res.status(200).render("followersAndFollowing",payload);               //talking about .pug
});

router.get("/:username/followers",async (req,res,next) => {

    var payload = await getPayload(req.params.username,req.session.user);
    payload.selectedTab = "followers";
    res.status(200).render("followersAndFollowing",payload);               //talking about .pug
});

async function getPayload(username,userLoggedIn){
    var user = await User.findOne({username: username});

    if(user == null){

        user = await User.findById(username);
        if(user == null){
            return {
                pageTitle : "User Not Found!",
                userLoggedIn: userLoggedIn,
                userLoggedInJs: JSON.stringify(userLoggedIn )
            }
        }
    }

    return {
        pageTitle : user.username,
        userLoggedIn: userLoggedIn,
        userLoggedInJs: JSON.stringify(userLoggedIn ),
        profileUser : user
    }
}

module.exports = router;