
require("dotenv").config();

const mongodbUri = process.env.MONGODB_URI;
const mongoose = require("mongoose");

const DbConnection = async()=>{
    await mongoose.connect(mongodbUri).then(()=>{
        console.log("Database Connected :)");
    }).catch(err=>{
        console.log("Error Occured while connecting to db :( =>",err);
    })
}

module.exports = DbConnection;