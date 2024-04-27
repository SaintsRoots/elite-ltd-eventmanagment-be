import * as ContactSercive from "../services/contact.services";
import { validateContact } from "../validations/contacct.validation";
import Contact from "../models/contact.models";
// create a new Contact service

export const createContact = async (req, res) => {
    const { error, value } = validateContact(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    try {
        const contact = await ContactSercive.createContact(value);
        return res.status(201).json({
            status: "201",
            message: "Contact created successfully",
            data: contact
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "500",
            message: "Failed to create a new Contact",
            error: error.message
        });
    }
};

// get all Contact

export const getAllContact = async (req, res) => {
    try {
        const Contact = await ContactSercive.getContacts();
        return res.status(200).json({
            status: "200",
            message: "All Contact",
            data: Contact,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "500",
            message: "Failed to get all Contact",
            error: error.message,
        });
    }
};

// get Contact by id

export const getContactById = async (req, res) => {
    try {
        const { id } = req.params;
        const findId = await Contact.findById(id);
        if (!findId) {
            return res.status(404).json({
                status: "404",
                message: "Contact not found",
            });
        }
        const contact = await ContactSercive.getContactById(id);
        if (!contact) {
            return res.status(404).json({
                status: "404",
                message: "Contact Not Found",
            });
        }
        return res.status(200).json({
            status: "200",
            message: "Contact",
            data: contact,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "500",
            message: "Failed to get Contact",
            error: error.message,
        });
    }
};

// update Contact
export const updateContact = async (req, res) => {
    const { error, value } = validateContact(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const { id } = req.params;
        const findId = await Contact.findById(id);
        if (!findId) {
            return res.status(404).json({
                status: "404",
                message: "Contact not found",
            });
        }
        await ContactSercive.updateContact(id, value);
        res.status(200).json({
            status: "200",
            message: "Contact Updated Successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to Update Contact",
            error: error.message,
        });
    }
};
// delete Contact

export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const findId = await Contact.findById(id);
        if (!findId) {
            return res.status(404).json({
                status: "404",
                message: "Contact not found",
            });
        }
        await ContactSercive.deleteContact(id);
        return res.status(201).json({
            status: "201",
            message: "Contact Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "500",
            message: "Failed to Delete a new Contact",
            error: error.message,
        });
    }
};


