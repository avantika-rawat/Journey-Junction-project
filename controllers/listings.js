const { response } = require("express");
const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req,res)=>{
    const allListings =  await Listing.find({});
     res.render("listings/index.ejs", {allListings});
   }


   module.exports.renderNewForm = (req, res)=>{
    res.render("listings/new.ejs");
}

module.exports.showlisting = async(req, res)=>{
   let {id} = req.params;
   const listing = await Listing.findById(id).populate({path : "reviews", populate:{path :"author"}}).populate("owner");
   if(!listing){
    req.flash("error", "Lisiting you requested for, does not exist!");
    res.redirect("/listings");
   }
   console.log(listing);
   res.render("listings/show.ejs",{listing});
   }


   module.exports.createlisting = async (req,res,next)=>{
    let response = await geocodingClient.forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
      .send();
     

      // let {title, description, image, price, country, location} = req.body;  //(we can use this way to extract details from the fomr but using the next line instead)
      // if(!req.body.listing){
      //     throw new ExpressError(400,"send valid data for listing");
      // }
      
      let url = req.file.path;
      let filename = req.file.filename;
      let listing = req.body.listing;
      const newListing = new Listing(listing);
      newListing.owner =req.user._id;
      newListing.image = {filename,url};
      newListing.geometry = response.body.features[0].geometry;
      
      let savedListing = await newListing.save();
      console.log(savedListing);
    //   await newListing.save();
      req.flash("success", "New Listing added");
      res.redirect("/listings");
      
      
      }


      module.exports.renderEditForm = async (req,res)=>{
             let {id} =req.params;
             const listing = await Listing.findById(id);
             if(!listing){
             req.flash("error", "Lisiting you requested for, does not exist!");
             res.redirect("/listings");
             }
             let originalImageUrl = listing.image.url;
             originalImageUrl.replace("/upload", "/upload/w_250");
             res.render("listings/edit.ejs",{listing, originalImageUrl});
         };



    module.exports.updateListing = async (req, res)=>{
                if(!req.body.listing){
                    throw new ExpressError(400,"send valid data for listing");
                }
                let {id} = req.params;
                const listing = await Listing.findByIdAndUpdate(id, {...req.body.listing},{ new: true });//add filter, then destructered, then option to print updated data in console
               
               if(typeof req.file !== "undefined"){
                let url = req.file.path;
               let filename = req.file.filename;
               listing.image = {url , filename};
               await listing.save();
               }
            
               req.flash("success", "Listing updated");
               res.redirect(`/listings/${id}`);
            }


            module.exports.deleteListing = async (req,res)=>{
                let {id} = req.params;
                let deleteListing = await Listing.findByIdAndDelete(id);
                console.log(deleteListing);
                req.flash("success", "Listing Deleted");
                res.redirect("/listings");
                }