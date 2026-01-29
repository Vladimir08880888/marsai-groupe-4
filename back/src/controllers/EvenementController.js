import Evenement from "../models/Evenement.js";
import Reservation from "../models/Reservation.js";

export const getAllEvenements = async (req, res) => {
  try {
    const evenements = await Evenement.findAll({
      order: [["date", "ASC"]],
    });
    res.json(evenements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEvenementsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const evenements = await Evenement.findAll({
      where: { type },
      order: [["date", "ASC"]],
    });
    res.json(evenements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEvenementById = async (req, res) => {
  try {
    const { id } = req.params;
    const evenement = await Evenement.findByPk(id);
    if (!evenement) {
      return res.status(404).json({ error: "Événement non trouvé" });
    }

    // Compter les réservations
    const reservationsCount = await Reservation.count({
      where: { id_evenement: id },
    });

    const result = {
      ...evenement.toJSON(),
      places_restantes: 15 - reservationsCount,
      reservations_count: reservationsCount,
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWorkshopsWithPlaces = async (req, res) => {
  try {
    const workshops = await Evenement.findAll({
      where: { type: "workshop" },
      order: [["date", "ASC"]],
    });

    // Pour chaque workshop, compter les réservations
    const workshopsWithPlaces = await Promise.all(
      workshops.map(async (workshop) => {
        const reservationsCount = await Reservation.count({
          where: { id_evenement: workshop.id_evenement },
        });
        return {
          ...workshop.toJSON(),
          places_restantes: 15 - reservationsCount,
          reservations_count: reservationsCount,
        };
      })
    );

    res.json(workshopsWithPlaces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createEvenement = async (req, res) => {
  try {
    const evenement = await Evenement.create(req.body);
    res.status(201).json(evenement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEvenement = async (req, res) => {
  try {
    const { id } = req.params;
    const evenement = await Evenement.findByPk(id);
    if (!evenement) {
      return res.status(404).json({ error: "Événement non trouvé" });
    }
    await evenement.update(req.body);
    res.json(evenement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEvenement = async (req, res) => {
  try {
    const { id } = req.params;
    const evenement = await Evenement.findByPk(id);
    if (!evenement) {
      return res.status(404).json({ error: "Événement non trouvé" });
    }
    await evenement.destroy();
    res.json({ message: "Événement supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
