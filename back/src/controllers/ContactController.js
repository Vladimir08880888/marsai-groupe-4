import Contact from "../models/Contact.js";

// Public — anyone can send a contact message
async function createContact(req, res) {
  try {
    const { email, name, subject, message } = req.body;

    if (!email || !name || !subject || !message) {
      return res.status(400).json({ error: "All fields are required: email, name, subject, message" });
    }

    const contact = await Contact.create({ email, name, subject, message });
    res.status(201).json({ message: "Message sent successfully", contact });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message", details: error.message });
  }
}

// Admin — list all contact messages
async function listContacts(req, res) {
  try {
    const contacts = await Contact.findAll({ order: [["created_at", "DESC"]] });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts", details: error.message });
  }
}

export default { createContact, listContacts };
