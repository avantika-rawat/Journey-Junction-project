const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema} = require("../schema.js");
const Review = require("../models/review");
const Listing = require("../models/listing");
const {validateReview,isLoggedin, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");




//route for review form
router.post("/",isLoggedin, validateReview, wrapAsync(reviewController.createReview ));
    
    


//delete review route
router.delete("/:reviewId",isLoggedin,isReviewAuthor, wrapAsync(reviewController.destroyReview
 ));


    module.exports = router;