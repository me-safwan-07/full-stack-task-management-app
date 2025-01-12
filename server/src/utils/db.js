import mongoose from "mongoose";

const db = mongoose.connect("mongodb://localhost:27017/mydatabase")
   .then(() => {
        console.log("Connected to MongoDB successfully!");
    })
   .catch(error => {
        console.error("Error connecting to MongoDB:", error.message);

        // Handle specific error conditions
        if (error.name === "MongoNetworkError") {
            console.error("MongoDB connection failed. Please make sure MongoDB is running on localhost:27017.");
        } else if (error.name === "MongooseServerSelectionError") {
            console.error("MongoDB connection failed. Please check the connection string and ensure it's correct.");
        } else {
            // Handle other types of error
            console.error("An unexpected error occurred while connecting to MongoDB:", error.message);
        }
    });


export default db;

