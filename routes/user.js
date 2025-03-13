const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/user.js");


router.route("/signup")
//route to get signup page
.get( userController.renderSignUpForm)
//route to submit details of signup from client side
.post( wrapAsync(userController.signUp ));


router.route("/login")
.get( userController.renderLoginForm)
//route to login with the login details entered in the client side.

//passport.authenticate() is mw by passport which autheticates whether user exists or not
.post(saveRedirectUrl, passport.authenticate("local",{failureRedirect : '/login',failureFlash : true}),
userController.login);




router.get("/logout", userController.logout);


module.exports = router;