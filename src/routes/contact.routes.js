import express from "express";
import fileUpload from "../helper/multer";

import { createContact, deleteContact, getAllContact, getContactById, updateContact } from "../controllers/contact.controller";
const contactRoute = express.Router();
contactRoute.get("/", getAllContact);
contactRoute.get("/:id", getContactById);
contactRoute.post("/", fileUpload.single("files"), createContact);
contactRoute.put("/:id", fileUpload.single("files"), updateContact);
contactRoute.delete("/:id", deleteContact);

export default contactRoute;
