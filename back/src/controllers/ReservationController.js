import Reservation from "../models/Reservation.js";
import Event from "../models/Event.js";
import sendMail from "../services/mailer.js";

// Public — create a reservation
async function createReservation(req, res) {
  try {
    const { first_name, last_name, email, profession, event_id } = req.body;

    if (!first_name || !last_name || !email || !event_id) {
      return res.status(400).json({ error: "first_name, last_name, email, event_id are required" });
    }

    // Check event exists and is OPEN
    const event = await Event.findByPk(event_id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (event.status !== "OPEN") {
      return res.status(400).json({ error: "Event is not open for reservations" });
    }

    if (event.capacity > 0 && event.enrolled >= event.capacity) {
      return res.status(400).json({ error: "Event is full" });
    }

    const reservation = await Reservation.create({ first_name, last_name, email, profession, event_id });

    // Increment enrolled count
    await event.increment("enrolled");

    sendMail(email, `MarsAI — Reservation confirmed: ${event.title}`,
      `<p>Hi ${first_name},</p><p>Your reservation for <strong>${event.title}</strong> has been confirmed.</p><ul><li><strong>Date:</strong> ${event.event_date || "TBD"}</li><li><strong>Location:</strong> ${event.location || "TBD"}</li></ul><p>— The MarsAI Team</p>`);

    res.status(201).json({ message: "Reservation created successfully", reservation });
  } catch (error) {
    res.status(500).json({ error: "Failed to create reservation", details: error.message });
  }
}

// Admin — list all reservations
async function listReservations(req, res) {
  try {
    const reservations = await Reservation.findAll({
      include: [
        {
          model: Event,
          as: "event",
          attributes: ["id", "title", "event_date", "location"],
        },
      ],
      order: [["created_at", "DESC"]],
    });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reservations", details: error.message });
  }
}

export default { createReservation, listReservations };
