const Listing = require("../models/listing");


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
      // let {title, description, image, price, country, location} = req.body;  //(we can use this way to extract details from the fomr but using the next line instead)
      // if(!req.body.listing){
      //     throw new ExpressError(400,"send valid data for listing");
      // }
      
      
      let listing = req.body.listing;
      const newListing = new Listing(listing);
      newListing.owner =req.user._id;
      await newListing.save();
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
             res.render("listings/edit.ejs",{listing});
         }



         module.exports.updateListing = async (req, res)=>{
                if(!req.body.listing){
                    throw new ExpressError(400,"send valid data for listing");
                }
                let {id} = req.params;
                const see = await Listing.findByIdAndUpdate(id, {...req.body.listing},{ new: true }); //add filter, then destructered, then option to print updated data in console
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