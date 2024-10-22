import express from "express";
import { auth } from "../controllers/index.js";

const router = express.Router();

router.post("/signup", auth.signup);
router.post("/login", auth.login);
router.get("/logout", auth.logout);
router.get("/authCheck", auth.authCheck);

// router.use((req, res) => {
//   res.status(404).send("Route not found but server is working");
// });

export default router;
