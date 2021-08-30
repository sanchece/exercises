const jwt = require("jsonwebtoken");
const Router = require("express").Router;
const router = new Router();
const User = require("../models/user");
const {SECRET_KEY} = require("../config");

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post("/login",async function (req,res,next){
    let username= req.body.username;
    let password= req.body.password;
    if( await User.authenticate(username,password)){
        let token= jwt.sign({username},SECRET_KEY);
        User.updateLoginTimestamp(username);
        return res.send({token});}
})

router.post("/register",async function (req,res,next){
    let username= req.body.username;
    let res= await User.register(username);
    let token = jwt.sign({username},SECRET_KEY);
    User.updateLoginTimestamp(username);
    return res.send({token})
})



/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
