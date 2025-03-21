//this file is being used to connect our third party app which is our cloudinary with our webiste, so here we will provide credentials to it for connection to website


const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');



cloudinary.config({
    //by default, the name we used here to store data from .env, remains always the same
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
});

//tells the actual location to the files(where they are saved)
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'JourneyJunction_DEV',
      allowedformat: ["png", "jpeg","jpg"]
    },
  });

  module.exports = {
    cloudinary,
    storage,
  }
