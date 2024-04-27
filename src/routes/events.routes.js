import express from "express";
import fileUpload from "../helper/multer";
import { createEvent, deleteEvent, getAllEvents, getOneEvent, updateEvent } from "../controllers/events.controller";
import Auth from "../middleware/auth";

const eventRoute = express.Router();
eventRoute.get("/", getAllEvents);
eventRoute.get("/:id", getOneEvent);
eventRoute.post("/", fileUpload.single("image_url"), Auth, createEvent);
eventRoute.put("/:id", fileUpload.single("image_url"), Auth, updateEvent);
eventRoute.delete("/:id", deleteEvent);

export default eventRoute;
