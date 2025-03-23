const ExpressError = require("./utils/ExpressError.js");
const Listing = require("./models/listing");
const {listingSchema,reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");


module.exports.isLoggedin =
(req,res,next)=>{
    if(!req.isAuthenticated()){
        //req.originalUrl stores the actual whole path on which user is currently
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in to Journey Junction");
        return res.redirect("/login");
    }
    next();
}


//we create a diff middleware for req.session.redirectUrl as we are using locals which can be accessed fromanywhere and cannot be deleted by the passport automatically
module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};


module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
       //first we will extract the id, and check whether user has permission to update or not
       let listing = await Listing.findById(id);
       if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You dont have permission to edit");
        return res.redirect(`/listings/${id}`);
       }
       next();
}


module.exports.isReviewAuthor = async(req,res,next)=>{
    let {reviewId,id} = req.params;
       //first we will extract the id, and check whether user has permission to update or not
       let listing = await Review.findById(id);
       if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of this review.");
        return res.redirect(`/listings/${id}`);
       }
       next();
}


module.exports.validateListing = (req,res,next)=>{
    //since we cannot validate every field of schema model, we use a tool called joi
    console.log("Request body:", req.body);

    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
    }

module.exports.validateReview = (req,res,next)=>{
        //since we cannot validate every field of schema model, we use a tool called joi
        
        let {error} = reviewSchema.validate(req.body);
        if(error){
            let errMsg = error.details.map((el)=>el.message).join(",");
            throw new ExpressError(400, errMsg);
        }else{
            next();
        }
        }