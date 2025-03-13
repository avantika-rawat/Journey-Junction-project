const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");



const MONGO_URL = "mongodb://127.0.0.1:27017/journeyJunction";

main().then(() =>{
    console.log("connected to database");
})
.catch((err)=>{
console.log(err);
});


async function main() {
    await mongoose.connect(MONGO_URL)
}

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,  owner: "67cab90dd0cbe891a71c16df"}));
      await Listing.insertMany(initData.data);
      console.log("database initialized");
};


initDB();