import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenvFlow from "dotenv-flow";
import { connectDB } from "./projects/roc8/config/db.js";

// projects related import
import { roc8Router } from "./projects/index.route.js";

dotenvFlow.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} request to ${req.url}`
  );

  console.log("server base path ", res.session, "--end");
  next();
});

//this is only for development purpose all https related logic have to configure in nginx

if (process.env.NODE_ENV === "development") {
  const allowedOriginPattern =
    /^https?:\/\/(.*\.)?yashsagar\.in$|^http:\/\/localhost:5173$/;
  app.use(
    cors({
      origin: (origin, callback) => {
        // Check if the origin is allowed or if it is undefined (no Origin header)
        if (!origin || allowedOriginPattern.test(origin)) {
          callback(null, origin); // Allow the origin
        } else {
          callback(new Error("Not allowed by CORS")); // Disallow the origin
        }
      },
      methods: "GET, POST, OPTIONS, PUT, DELETE", // Allow only these methods
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true, // Allows cookies to be sent
    })
  );
}

// for testing purpose
// app.use((req, res, next) => {
//   console.log(
//     `${new Date().toISOString()} - ${req.method} request to ${req.url}`
//   );

//   console.log("server base path ", res.session, "--end");
//   next();
// });

// routing the request accroding to project
app.use("/roc8", roc8Router);

// for testing purpose
app.get("/test", (req, res) => {
  res.json({
    succsess: true,
    message: "end point working",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`sever started on : http://localhost:${process.env.PORT}`);
  connectDB();
});
