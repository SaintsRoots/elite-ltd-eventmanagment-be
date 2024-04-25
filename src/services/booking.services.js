import Booking from "../models/bookings.models";
import Event from "../models/events.models";
// Create a new booking
export const createBooking = async (number_of_tickets, total_price, event_id, user_id) => {
    return await Booking.create({
        user_id,
        event_id,
        number_of_tickets,
        total_price
    });
};

// Get all bookings
export const getBookings = async () => {
    return await Booking.find()
        .populate('event_id')
        .populate('user_id', 'name email profile');
};

// Get a single booking by ID
export const getBookingById = async (id) => {
    return await Booking.findById(id)
        .populate('event_id')
        .populate('user_id', 'name email profile');
};

// Update a booking
export const updateBooking = async (id, bookingData, event_id, user_id) => {
    const event = await Event.findById(event_id);
    if (!event) {
        throw new Error("Event not found");
    }

    const total_price = event.price * bookingData.number_of_tickets;

    return await Booking.findByIdAndUpdate(id, {
        user_id,
        event_id, 
        number_of_tickets: bookingData.number_of_tickets,
        total_price
    }, { new: true });
};


// Delete a booking
export const deleteBooking = async (id) => {
    return await Booking.findByIdAndDelete(id);
};

