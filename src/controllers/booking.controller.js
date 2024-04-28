import * as BookingSercive from "../services/booking.services";
import Event from "../models/events.models";
import Booking from "../models/bookings.models"
import { validateCreateBooking, validateUpdateBooking } from "../validations/booking.validation";
import { sendEmailPersonBookedTickets } from "../utils/emailTemplate";

// create a new booking service

export const createBooking = async (req, res) => {
    const { error, value } = validateCreateBooking(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    try {
        const { event_id } = req.params;
        const event = await Event.findById(event_id);
        if (!event) {
            return res.status(404).json({
                status: "404",
                message: "Event not found"
            });
        }

        // Check if there are enough tickets available
        if (event.available_tickets < value.number_of_tickets) {
            return res.status(400).json({
                status: "400",
                message: "Not enough tickets available"
            });
        }

        // Calculate total price
        const total_price = event.price * value.number_of_tickets;

        // Create booking
        const booking = await BookingSercive.createBooking(
            value.number_of_tickets,
            total_price,
            event_id,
            req.User._id
        );

        await Event.findByIdAndUpdate(
            event_id,
            {
                $inc: { available_tickets: - value.number_of_tickets },
                $push: { bookings: booking._id }
            },
            { new: true }
        );

        const eventDetails = {
            title: event.title,
            total_price: total_price,
            number_of_tickets: value.number_of_tickets
        };

        // Sending an email to the user
        sendEmailPersonBookedTickets(req.User.email, req.User.name, eventDetails);

        return res.status(201).json({
            status: "201",
            message: "Booking created successfully",
            data: booking
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "500",
            message: "Failed to create a new booking",
            error: error.message
        });
    }
};

// get all booking

export const getAllBooking = async (req, res) => {
    try {
        const booking = await BookingSercive.getBookings();
        return res.status(200).json({
            status: "200",
            message: "All Booking",
            data: booking,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "500",
            message: "Failed to get all Booking",
            error: error.message,
        });
    }
};

// get booking by id

export const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const findId = await Booking.findById(id);
        if (!findId) {
            return res.status(404).json({
                status: "404",
                message: "Booking not found",
            });
        }
        const booking = await BookingSercive.getBookingById(id);
        return res.status(200).json({
            status: "200",
            message: "Booking",
            data: booking,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "500",
            message: "Failed to get Booking",
            error: error.message,
        });
    }
};

// update booking
export const updateBooking = async (req, res) => {
    const { error, value } = validateUpdateBooking(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }

    try {
        const { id } = req.params;

        const currentBooking = await Booking.findById(id).populate('event_id');
        if (!currentBooking) {
            return res.status(404).json({
                status: "404",
                message: "Booking not found",
            });
        }


        const ticketDifference = currentBooking.number_of_tickets - value.number_of_tickets;

        const updatedBooking = await Booking.findByIdAndUpdate(id, {
            number_of_tickets: value.number_of_tickets,
            total_price: currentBooking.event_id.price * value.number_of_tickets
        }, { new: true });


        if (ticketDifference > 0) {
            await Event.findByIdAndUpdate(currentBooking.event_id._id, {
                $inc: { available_tickets: ticketDifference }
            });
        } else if (ticketDifference < 0) {
            if (currentBooking.event_id.available_tickets + ticketDifference < 0) {
                return res.status(400).json({
                    status: "400",
                    message: "Not enough tickets available"
                });
            }
            await Event.findByIdAndUpdate(currentBooking.event_id._id, {
                $inc: { available_tickets: ticketDifference }
            });
        }

        return res.status(200).json({
            status: "200",
            message: "Booking updated successfully",
            data: updatedBooking,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "500",
            message: "Failed to update the booking",
            error: error.message,
        });
    }
};



// delete booking

export const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const findId = await Booking.findById(id);
        if (!findId) {
            return res.status(404).json({
                status: "404",
                message: "Booking not found",
            });
        }
        await BookingSercive.deleteBooking(id);
        return res.status(200).json({
            status: "200",
            message: "Booking Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "500",
            message: "Failed to Delete a new Booking",
            error: error.message,
        });
    }
};


