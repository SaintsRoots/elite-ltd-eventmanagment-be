import mongoose from "mongoose";
// Events Table
// This table stores all details related to events managed by the platform.
const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date_schedule: {
            type: Date,
        },
        location: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: 'upcoming',
        },
        available_tickets: {
            type: Number,
        },
        price: {
            type: Number,
        },
        time: {
            type: String,
        },
        image_url: {
            type: String,
        },
        bookings: [{
            type: mongoose.Schema.ObjectId,
            ref: "bookings",
        }],
        user_id: {
            type: mongoose.Schema.ObjectId,
            ref: "users",
            required: true,
        },
    },
    { timestamps: true }
);

const Event = mongoose.models.events || mongoose.model("events", eventSchema);

export default Event;
