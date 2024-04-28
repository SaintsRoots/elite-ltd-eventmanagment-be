import * as EventsServices from "../services/events.services";
import { validateCreateEvent, validateUpdateEvent } from "../validations/event.validation";
import Event from "../models/events.models";
import { notifyUserOfNewEvent } from "../utils/emailTemplate"
// create a new Event

export const createEvent = async (req, res) => {
    const { error, value } = validateCreateEvent(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }
    try {
        const { title, description, date_schedule, location, price } = value;
        const categoryExist = await Event.findOne({ title: title });

        if (categoryExist) {
            return res.status(403).json({
                status: "403",
                message: "Event already exists",
            });
        }
        const category = await EventsServices.createEvent(
            value,
            req.file,
            req.User._id
        );

        // sending email notification to subscribers
        const eventDetails = {
            title,
            description,
            date_schedule,
            location,
            price
        };

        const subscribers = await EventsServices.getSubscribers();
        subscribers.forEach(subscriber => {
            notifyUserOfNewEvent(subscriber.email, eventDetails);
        });

        return res.status(201).json({
            status: "201",
            message: "Event created successfully",
            data: category,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "500",
            message: "Failed to create a new event",
            error: error.message,
        });
    }
};

// get all events

export const getAllEvents = async (req, res) => {
    try {
        const events = await EventsServices.getEvents();
        return res.status(200).json({
            status: "200",
            message: "Events retrieved successfully",
            data: events,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "500",
            message: "Failed to get all events",
            error: error.message,
        });
    }
};

// get one event

export const getOneEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const findId = await Event.findById(id);
        if (!findId) {
            return res.status(404).json({
                status: "404",
                message: "Event not found",
            });
        }
        const event = await EventsServices.getEventById(id);
        return res.status(200).json({
            status: "200",
            message: "Event retrieved successfully",
            data: event,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "500",
            message: "Failed to get one event",
            error: error.message,
        });
    }
};

// update event

export const updateEvent = async (req, res) => {
    const { error, value } = validateUpdateEvent(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }
    try {
        const { title, description, date_schedule, location, price } = value;

        const { id } = req.params;
        const findId = await Event.findById(id);
        if (!findId) {
            return res.status(404).json({
                status: "404",
                message: "Event not found",
            });
        }
        await EventsServices.updateEvent(
            id,
            value,
            req.file,
            req.User._id
        );

        // sending email notification to subscribers
        const eventDetails = {
            title,
            description,
            date_schedule,
            location,
            price
        };

        const subscribers = await EventsServices.getSubscribers();
        subscribers.forEach(subscriber => {
            notifyUserOfNewEvent(subscriber.email, eventDetails);
        });
        return res.status(201).json({
            status: "201",
            message: "Event updated successfully",

        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "500",
            message: "Failed to update event",
            error: error.message,
        });
    }
};

// delete event

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const findId = await Event.findById(id);
        if (!findId) {
            return res.status(404).json({
                status: "404",
                message: "Event not found",
            });
        }
        await EventsServices.deleteEvent(id);
        return res.status(200).json({
            status: "200",
            message: "Event deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "500",
            message: "Failed to delete event",
            error: error.message,
        });
    }
};
