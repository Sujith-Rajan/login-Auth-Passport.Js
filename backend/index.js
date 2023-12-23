const express = require('express')
const cors = require('cors')
const cookieSession = require("cookie-session")
const mongoose = require('mongoose')
const passport = require('passport')
const dotenv = require('dotenv')
const pasportSetup = require('./passport.js')
const authRoute = require('./routes/auth.js')

dotenv.config()
const app = express()

const db = async() => {
    try{
        mongoose.connect("mongodb://127.0.0.1:27017/passportJs")
        console.log("Database Connection Success") 
    }
    catch(err){
        console.log(err)
    }
}
db();

app.use(
    cookieSession({ name:"session", keys: ["passport"], maxAge: 24 * 60 * 60 * 100})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin:"http://localhost:3000",
        methods:"GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.use('/auth',authRoute)

app.listen(8000,()=>{
    console.log("Server running at port 8000")
});