import mongoose from "mongoose";
import dns from "dns";

// This helps resolve connection issues on some hosting providers like Render
dns.setServers(['8.8.8.8', '1.1.1.1']);

const dbConnect = async () => {
    try {
        // Use the environment variable from your Render dashboard
        // If it's not set, it will fallback to your provided string
        const connectionString = process.env.MONGODB_URI || "mongodb+srv://balkaran:balkaran@cluster0.spwaxc7.mongodb.net/singh";

        await mongoose.connect(connectionString, {
            // These options ensure a more stable connection in production
            serverSelectionTimeoutMS: 5000, 
            socketTimeoutMS: 45000,
        });

        console.log("Database is connected successfully.");
    } catch (error) {
        console.error("Database connection error details:");
        console.log(error);
        
        // This will help you see if it's an IP whitelist issue specifically
        if (error.message.includes('buffering timed out')) {
            console.log("HINT: Check your MongoDB Atlas 'Network Access' and allow 0.0.0.0/0");
        }
    }
};

export default dbConnect;