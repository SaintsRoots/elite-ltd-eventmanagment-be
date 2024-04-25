import Joi from "joi";

// Validation schema for creating an booking
const createBookingSchema = Joi.object({
    number_of_tickets: Joi.string().required(),
});

// Validation schema for updating an booking
const updateBookingSchema = Joi.object({
    number_of_tickets: Joi.string().required(),
}).or('number_of_tickets');

// Function to validate booking creation
export const validateCreateBooking = (bookingData) => {
  return createBookingSchema.validate(bookingData);
};

// Function to validate booking update
export const validateUpdateBooking = (bookingData) => {
  return updateBookingSchema.validate(bookingData);
};
