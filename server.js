import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

// projects related import
import { roc8Router } from "./projects/index.route.js";

dotenv.config();

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
  app.use(
    cors({
      origin: ["http://localhost:5173"],
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
});
