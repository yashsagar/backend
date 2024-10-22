import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log("MongoDB connected: " + conn.connection.host);
  } catch (error) {
    console.error("Error connecting to MONGODB: " + error.message);
    process.exit(1); // 1 means there was an error, 0 means success
  }
};

// since my app for potfolio project i am closing the connection here

// let idleTimeout;

// Create a connection instance when this file import the connection object sessionDbConnection will create
// export const roc8DbConnection = mongoose.createConnection();

// export const maintainMongoconnection = () => {
//   // Function to reset the idle timeout
//   const resetIdleTimeout = () => {
//     if (idleTimeout) clearTimeout(idleTimeout);
//     idleTimeout = setTimeout(() => {
//       roc8DbConnection.close(() => {
//         console.log("Connection closed due to 5 minutes of inactivity.");
//       });
//     }, 300000); // 5 minutes
//   };

//when the function calls will check for the connection if it closed then it will extablish the new connection
//   if (roc8DbConnection.readyState === 0) {
//     roc8DbConnection.openUri(ENV_VARS.ROC8_MONGO_URI);
//   }

//   resetIdleTimeout();
// };

// export const roc8mongoDB = async () => {
//   try {
//     const roc8mongoConnection = mongoose.createConnection(
//       process.env.ROC8_MONGO_URI,
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     );

//     console.log("MongoDB connected: " + roc8mongoConnection.connection.host);
//   } catch (error) {
//     console.error("Error connecting to MONGODB: " + error.message);
//     process.exit(1); // 1 means there was an error, 0 means success
//   }
// };
