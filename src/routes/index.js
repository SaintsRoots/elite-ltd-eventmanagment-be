import express from "express";
import docrouter from "../docs/Docs";
import userRoute from "./users.routes";
import eventRoute from "./events.routes";

const router = express.Router();

// Route

router.use("/docs", docrouter);
router.use("/users", userRoute);
router.use("/events", eventRoute);

export default router;
