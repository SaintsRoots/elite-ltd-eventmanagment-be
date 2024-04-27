import Contact from "../models/contact.models";

// create a new Contact
export const createContact = async (ContactData) => {

    const { name, subject, email, message } = ContactData;
    return await Contact.create({
        name, subject, email, message
    })

};
// All Contacts
export const getContacts = async () => {
    return await Contact.find()
};
// single Contact
export const getContactById = async (id) => {
    return await Contact.findById(id)
};
// delted Contact
export const deleteContact = async (id) => {
    return await Contact.findByIdAndDelete(id);
};

// update Contact
export const updateContact = async (id, ContactData) => {
    const { name, subject, email, message } = ContactData;

    return await Contact.findByIdAndUpdate(id, ContactData, {
        name, subject, email, message
    });
};


