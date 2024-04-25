import express from "express";
import fileUpload from "../helper/multer";
import Auth from "../middleware/auth";
import { createBooking, deleteBooking, getAllBooking, getBookingById, updateBooking } from "../controllers/booking.controller";
const bookingRoute = express.Router();
bookingRoute.get("/", getAllBooking);
bookingRoute.get("/:id", getBookingById);
bookingRoute.post("/:event_id/event", fileUpload.single("files"),Auth, createBooking);
bookingRoute.put("/:id", fileUpload.single("files"), Auth, updateBooking);
bookingRoute.delete("/:id", deleteBooking);

export default bookingRoute;
