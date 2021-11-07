const { urlencoded } = require("body-parser");
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../schema/userSchema");
const bcrypt = require("bcrypt");

app.set("view engine","pug");
app.set("views","views");

app.use(bodyParser.urlencoded({extended:false}));


router.get("/",(req,res,next) => {
    res.status(200).render("register");               //talking about home.pug
});

router.post("/",async (req,res,next) => {
    
    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var password = req.body.password;

    var payload = req.body;

    if(firstName && lastName && username && email && password){
        var user = await User.findOne({
            $or:[
                {username: username},
                {email: email}
            ]
        })
        .catch((error)=>{
            console.log(error);
            payload.errorMessage = "Ooops something went wrong ";
            res.status(200).render("register",payload);
        })

        if(user == null){        
            var data = req.body;
            data.password = await bcrypt.hash(password,10);

            User.create(data)
            .then((user)=>{
                req.session.user = user;
                res.redirect("/");
            })
        }else{
            if(email === user.email){
                payload.errorMessage = "email already registered";
                res.status(200).render("register",payload);
            }else{
                payload.errorMessage = "username already taken!";
                res.status(200).render("register",payload);
            }
        }

        
    }else{
        payload.errorMessage = "!!Make sure to enter valid values!!";
        res.status(200).render("register",payload);               //talking about home.pug
    }

    
});

module.exports = router;