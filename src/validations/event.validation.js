import Joi from "joi";

// Validation schema for creating an Event
const createEventSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  available_tickets: Joi.number().required(),
  date_schedule: Joi.date().required(),
  price: Joi.number().required(),
  time: Joi.string().required(),
  image_url: Joi.string(),
});

// Validation schema for updating an Event
const updateEventSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  location: Joi.string().optional(),
  available_tickets: Joi.string().optional(),
  date_schedule: Joi.date().optional(),
  price: Joi.number().optional(),
  time: Joi.string().optional(),
  image_url: Joi.string(),
}).or('title', 'description', 'location', 'available_tickets', 'date_schedule', 'price', 'time', 'image_url');

// Function to validate Event creation
export const validateCreateEvent = (eventData) => {
  return createEventSchema.validate(eventData);
};

// Function to validate Event update
export const validateUpdateEvent = (eventData) => {
  return updateEventSchema.validate(eventData);
};
