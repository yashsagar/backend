import express from "express";
import { authRoutes, dbRoutes } from "./routes/index.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import { maintainMongoconnection, roc8DbConnection } from "./config/db.js";

roc8DbConnection.openUri(process.env.ROC8_MONGO_URI);
const router = express.Router();

// router.use((req, res, next) => {
//   maintainMongoconnection();
//   next();
// });

router.use(
  session({
    // store: new MongoStore({
    //   clientPromise: roc8DbConnection.getClient(), // Use the session database connection which already created using mongoose.connect() or mongoose.createConnection()
    //   collection: "sessions", // Optional: Specify the sessions collection name
    //   ttl: 14 * 24 * 60 * 60, // 14 days session expiration
    // }),
    secret: "aswdrfgttE4Ba0cfD@",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      secure: false, //since no ssl certificate configuration
      httpOnly: true,
      sameSite: "lax",
    },
    name: "roc8AuthCookie",
  })
);

// router.use((req, res, next) => {
//   console.log(
//     `${new Date().toISOString()} - ${req.method} request to ${req.url}`
//   );

//   console.log("server base path ", res.session, "--end");
//   next();
// });

router.use("/v1/auth", authRoutes);
router.use("/v1/db", dbRoutes);

// testing purpose

export default router;
