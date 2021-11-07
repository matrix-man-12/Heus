const mongoose = require("mongoose");
mongoose.set("useNewUrlParser",true);
mongoose.set("useUnifiedTopology",true);
mongoose.set("useFindAndModify",false);


class Database{
    constructor(){
        this.connect();
    }

    connect(){
        mongoose.connect("mongodb+srv://adminyogesh:adminyogesh@twitterclonecluster.z6rur.mongodb.net/TwitterCloneDB?retryWrites=true&w=majority")
        .then(()=>{
            console.log("Connection to database SUCCESSFULL!!");
        })
        .catch((err)=>{
            console.log("Database connection error " + err);
        })
    }
}

module.exports = new Database();