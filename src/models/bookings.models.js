import mongoose from "mongoose";
// Bookings Table
// This table manages the bookings made by users for various events.
const bookingSchema = new mongoose.Schema(
    {
        event_id: {
            type: mongoose.Schema.ObjectId,
            ref: "events",
        },
        user_id: {
            type: mongoose.Schema.ObjectId,
            ref: "users",
            required: true,
        },
        number_of_tickets: {
            type: Number,
        },
        status: {
            type: String,
            default: "pending",
            required: true,  
        },
        total_price: {
            type: Number,
        },
    },
    { timestamps: true }
);

const Booking = mongoose.models.bookings || mongoose.model("bookings", bookingSchema);

export default Booking;
