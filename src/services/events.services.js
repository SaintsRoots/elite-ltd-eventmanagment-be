import Event from "../models/events.models";
import { uploadToCloud } from "../helper/cloud";
import User from "../models/user.models";

// create a new event
export const createEvent = async (eventData, file, user) => {
    let result;
    if (file) result = await uploadToCloud(file);
    const { title, description, location, date_schedule, available_tickets, price, time } = eventData;
    return await Event.create({
        title, 
        description,
        location,
        date_schedule,
        price,
        available_tickets,
        time,
        image_url: result?.secure_url,
        user_id: user
    })

};
// All events
export const getEvents = async () => {
    return await Event.find().populate('user_id', 'name email profile');
};
// single event
export const getEventById = async (id) => {
    return await Event.findById(id).populate('user_id', 'name email profile').populate('bookings');
};
// delted event
export const deleteEvent = async (id) => {
    return await Event.findByIdAndDelete(id);
};

// update event
export const updateEvent = async (id, eventData, file, user) => {
    let result;
    if (file) result = await uploadToCloud(file);
    const { title, description, location, available_tickets, date_schedule, price, time } = eventData;

    return await Event.findByIdAndUpdate(id, eventData, {
        title, 
        description,
        location,
        date_schedule,
        price,
        available_tickets,
        time,
        image_url: result?.secure_url,
        user_id: user
    });
};

// find all subscribers

export const getSubscribers = async () => {
    return await User.find()
};
