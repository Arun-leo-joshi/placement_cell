//import all required packages 
const mongoose = require('mongoose');

//sets up the mongodb cloud url
MongoURL = process.env.MONGO_URL;

//connect to app to mongodb
mongoose.connect(MongoURL)
.then(()=>console.log('DB Connected Sucessfully'))
.catch((err)=>console.log(`Connetion Error in Mongodb ${err}`));
