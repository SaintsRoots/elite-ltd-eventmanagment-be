import Joi from 'joi';

// Validation schema for creating/updating a Contact
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  subject: Joi.string().required(),
  message: Joi.string().required(),
  reply: Joi.string().allow('').optional() 
});

// Function to validate Contact creation and updates
export const validateContact = (contactData) => {
  return contactSchema.validate(contactData);
};
