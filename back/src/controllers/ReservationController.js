import Reservation from "../models/Reservation.js";
import Evenement from "../models/Evenement.js";

export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReservationsByEvenement = async (req, res) => {
  try {
    const { evenementId } = req.params;
    const reservations = await Reservation.findAll({
      where: { id_evenement: evenementId },
    });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createReservation = async (req, res) => {
  try {
    const { id_evenement, nom, prenom, email, profession } = req.body;

    // Vérifier que l'événement existe
    const evenement = await Evenement.findByPk(id_evenement);
    if (!evenement) {
      return res.status(404).json({ error: "Événement non trouvé" });
    }

    // Vérifier s'il reste des places
    const reservationsCount = await Reservation.count({
      where: { id_evenement },
    });

    if (evenement.places_max > 0 && reservationsCount >= evenement.places_max) {
      return res.status(400).json({ error: "Plus de places disponibles" });
    }

    // Vérifier si l'email est déjà inscrit pour cet événement
    const existingReservation = await Reservation.findOne({
      where: { id_evenement, email },
    });

    if (existingReservation) {
      return res.status(400).json({ error: "Vous êtes déjà inscrit à cet événement" });
    }

    const reservation = await Reservation.create({
      nom,
      prenom,
      email,
      profession,
      id_evenement,
    });

    res.status(201).json({
      ...reservation.toJSON(),
      message: "Réservation confirmée",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ error: "Réservation non trouvée" });
    }
    await reservation.destroy();
    res.json({ message: "Réservation annulée" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
