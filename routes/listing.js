
const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");
const {isLoggedin,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const {storage} = require("../cloudConfig.js")
const multer  = require('multer');
const upload = multer({ storage }); //multer will save all the uploaded files to the cloudinary storage



//when we have two same path but diff req we use router.route to compact two methods.
router.route("/")
//index route
.get( wrapAsync(listingController.index))
.post(isLoggedin,validateListing ,upload.single("listing[image]"), wrapAsync(listingController.createlisting));    //create route

//instaed of app we use router, when using express router

   //new router
   router.get("/new",isLoggedin, listingController.renderNewForm);


router.route("/:id")
.put(validateListing,isLoggedin,isOwner, wrapAsync(listingController.updateListing)) //update route
.get( wrapAsync(listingController.showlisting))  //show route a specific
.delete(isLoggedin, wrapAsync(listingController.deleteListing));    //delete route






   //edit route
   router.get("/:id/edit",  isLoggedin, wrapAsync(listingController.renderEditForm));
   


   




   module.exports = router;