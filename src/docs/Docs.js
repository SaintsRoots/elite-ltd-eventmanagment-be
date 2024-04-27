import express from "express";
import { serve, setup } from "swagger-ui-express";

const docrouter = express.Router();

const options = {
  openapi: "3.0.1",
  info: {
    title: "Welcome to the ETITE LTD Event Management API",
    version: "1.0.0",
    description: "Documentation for ETITE LTD Event Management API.",
  },
  basePath: "/",
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    {
      name: "Users",
      description: "Operations related to Users entities",
    },
    {
      name: "Events",
      description: "Operations related to Events entities",
    },
    {
      name: "Booking",
      description: "Operations related to Bookings's Tickects entities",
    },
    {
      name: "Contact",
      description: "Operations related to Contact's  entities",
    }
  ],
  paths: {
    // users
    "/api/v1/users": {
      get: {
        tags: ["Users"],
        summary: "Get All Users",
        description: "Get all users",
        responses: {
          200: {
            description: "All User Posts retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      post: {
        tags: ["Users"],
        summary: "Create User",
        description: "Create a new user",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  profile: {
                    type: "string",
                    format: "binary",
                  },
                  password: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "New user created successfully",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/users/auth": {
      post: {
        tags: ["Users"],
        summary: "User Login",
        description: "User login",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                  },

                  password: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "User was logged in successfully",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Read User By ID",
        description: "Get a user by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User retrieved successfully",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      put: {
        tags: ["Users"],
        summary: "Update User",
        description: "Update an existing user",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  profile: {
                    type: "string",
                    format: "binary",
                  },
                  password: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "User updated successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["Users"],
        summary: "Delete User",
        description: "Delete a user by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/users/forgot-password": {
      post: {
        tags: ["Users"],
        summary: "Forgot Password",
        description: "Forgot Password",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Code to reset your password is sent to your email",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/users/reset-password": {
      post: {
        tags: ["Users"],
        summary: "Reset Password",
        description: "Reset Password",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  password: {
                    type: "string",
                  },
                  confirmPassword: {
                    type: "string",
                  },
                  code: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description:
              "Your Password changed!... you may now login with new password",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },


    // Events paths
    "/api/v1/events": {
      get: {
        tags: ["Events"],
        summary: "Get All Events",
        description: "Retrieve all events from the database",
        responses: {
          200: {
            description: "Events retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      post: {
        tags: ["Events"],
        summary: "Create Event",
        description: "Create a new event in the database",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  location: { type: "string" },
                  date_schedule: { type: "string", format: "date-time" },
                  price: { type: "number" },
                  available_tickets: { type: "number" },
                  time: { type: "string" },
                  image_url: {
                    type: "string",
                    format: "binary",
                    description: "Image file for the event"
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "Event created successfully",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/events/{id}": {
      get: {
        tags: ["Events"],
        summary: "Get Event By ID",
        description: "Retrieve a single event by its ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Event retrieved successfully",
          },
          404: {
            description: "Event not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      put: {
        tags: ["Events"],
        summary: "Update Event",
        description: "Update details of an existing event",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  location: { type: "string" },
                  date_schedule: { type: "string", format: "date-time" },
                  price: { type: "number" },
                  available_tickets: { type: "number" },
                  time: { type: "string" },
                  image_url: {
                    type: "string",
                    format: "binary",
                    description: "Image file for the event"
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Event updated successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Event not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["Events"],
        summary: "Delete Event",
        description: "Delete an event by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Event deleted successfully",
          },
          404: {
            description: "Event not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    // Booking paths
    "/api/v1/booking/{event_id}/event": {
      post: {
        tags: ["Booking"],
        summary: "Create booking",
        description: "Create a new booking in the database",
        parameters: [
          {
            name: "event_id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  number_of_tickets: { type: "number" },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "Event created successfully",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/booking": {
      get: {
        tags: ["Booking"],
        summary: "Get All Events",
        description: "Retrieve all events from the database",
        responses: {
          200: {
            description: "Events retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },

    },
    "/api/v1/booking/{id}": {
      get: {
        tags: ["Booking"],
        summary: "Get Booking By ID",
        description: "Retrieve a single event by its ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Booking retrieved successfully",
          },
          404: {
            description: "Booking not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      put: {
        tags: ["Booking"],
        summary: "Update Booking",
        description: "Update details of an existing Booking",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  number_of_tickets: { type: "number" },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Booking updated successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Booking not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["Booking"],
        summary: "Delete Booking",
        description: "Delete an Booking by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Booking deleted successfully",
          },
          404: {
            description: "Booking not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },


    // Contact paths
    "/api/v1/contact": {
      get: {
        tags: ["Contact"],
        summary: "Get All Contact",
        description: "Retrieve all contact from the database",
        responses: {
          200: {
            description: "ontact retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      post: {
        tags: ["Contact"],
        summary: "Create Contact",
        description: "Create a new Contact in the database",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  subject: { type: "string" },
                  email: { type: "string" },
                  message: { type: "string", },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "Contact created successfully",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/contact/{id}": {
      get: {
        tags: ["Contact"],
        summary: "Get Event By ID",
        description: "Retrieve a single event by its ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Contact retrieved successfully",
          },
          404: {
            description: "Contact not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      put: {
        tags: ["Contact"],
        summary: "Update Contact",
        description: "Update details of an existing event",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  subject: { type: "string" },
                  email: { type: "string" },
                  message: { type: "string", },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Contact updated successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Contact not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["Contact"],
        summary: "Delete Contact",
        description: "Delete an Contact by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Contact deleted successfully",
          },
          404: {
            description: "Contact not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

docrouter.use("/", serve, setup(options));

export default docrouter;
