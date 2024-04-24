import Event from "../models/events.models";
import { uploadToCloud } from "../helper/cloud";

// create a new event
export const createEvent = async (eventData, file, user) => {
    let result;
    if (file) result = await uploadToCloud(file);

    return await Event.create({
        title: eventData.title,
        description: eventData.description,
        location: eventData.location,
        date_schedule: eventData.date_schedule,
        location: eventData.location,
        price: eventData.price,
        time: eventData.time,
        image_url: result?.url,
        user_id: user
    })

};
// All events
export const getEvents = async () => {
    return await Event.find()
        .populate({
            path: "user_id",
            select: "name email profile",
        })
};
// single event
export const getEventById = async (id) => {
    return await Event.findById(id)
        .populate({
            path: "user_id",
            select: "name email profile",
        })
};
// delted event
export const deleteEvent = async (id) => {
    return await Event.findByIdAndDelete(id);
};

// update event
export const updateEvent = async (id, eventData, file, user) => {
    let result;
    if (file) result = await uploadToCloud(file);

    return await Event.findByIdAndUpdate(id, eventData, {
        title: eventData.title,
        description: eventData.description,
        location: eventData.location,
        date_schedule: eventData.date_schedule,
        location: eventData.location,
        price: eventData.price,
        time: eventData.time,
        image_url: result?.url,
        user_id: user
    });
};