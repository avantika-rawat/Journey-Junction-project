const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review = require('../models/review');
const { required } = require("joi");

const listingSchema= new Schema({
    title:{
        type:String,
       
    },
    description:{
        type:String 
    },
    image: {
      url : String,
      filename : String,
    },
    price:Number,
    location:String,
    country:String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "review",
        },
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    geometry : {
        type : String,
        enum : ['Point'],
        required : true
    },
    coordinates : {
        type : [Number],
        required : true
    }

});


listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({id : {$in : listing.reviews}});
    }
});
const Listing= mongoose.model("Listing",listingSchema);
module.exports=Listing;