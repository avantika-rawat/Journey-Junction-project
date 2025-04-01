const User = require("../models/user");

module.exports.renderSignUpForm = (req,res)=>{
    res.render("users/signup.ejs");
}





module.exports.signUp = 
async (req,res)=>{
try{
    let {username, email, password} = req.body;
const newUser = new User({email,username});
const registeredUser = await User.register(newUser, password);
console.log(registeredUser);
//to login automatic after signedup done - use req.login
req.login(registeredUser,(err)=>{
    if(err){
        return next();
    }
    req.flash("success", "Welcome to Journey Junction!");
res.redirect("/listings");
});

}
catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
}
}



module.exports.renderLoginForm = 
(req,res)=>{
    res.render("users/login.ejs");

}


module.exports.login = 
async(req,res)=>{
    console.log(req.body);
req.flash("success", "Welcome back to Journey Junction!!");
let redirectUrl = res.locals.redirectUrl || "/listings";
res.redirect(redirectUrl);
}


module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    });
}
