import mongoose from "mongoose";
// Bookings Table
// This table manages the bookings made by users for various events.
const bookingSchema = new mongoose.Schema(
    {
        event_id: {
            type: mongoose.Schema.ObjectId,
            ref: "events",
            required: true,
        },
        user_id: {
            type: mongoose.Schema.ObjectId,
            ref: "users",
            required: true,
        },
        number_of_tickets: {
            type: String,
        },
        status: {
            type: String,
            required: true,
        },
        total_price: {
            type: String,
        },
    },
    { timestamps: true }
);

const Booking = mongoose.models.bookings || mongoose.model("bookings", bookingSchema);

export default Booking;
