const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../schema/userSchema");

app.use(bodyParser.urlencoded({extended:false}));

app.set("view engine","pug");
//app.set("views","views");

router.get("/",(req,res,next) => {
    res.status(200).render("login");               //talking about login.pug
});

router.post("/",async (req,res,next) => {

    var payload = req.body;

    if(req.body.logUsername && req.body.logPassword){
        var user = await User.findOne({
            $or:[
                {username: req.body.logUsername},
                {email: req.body.logUsername}
            ]
        })
        .catch((error)=>{
            console.log(error);
            payload.errorMessage = "Ooops something went wrong ";
            res.status(200).render("login",payload);
        })


        if(user != null){
            var result =await bcrypt.compare(req.body.logPassword,user.password);

            if(result === true){
                req.session.user = user;
                return res.redirect("/")
            }
        }

        payload.errorMessage = "Login credentials are incorrect";
        res.status(200).render("login",payload);
    }
    payload.errorMessage = "Enter valid value";
    res.status(200).render("login");               //talking about login.pug
});

module.exports = router;