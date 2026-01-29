import { Award, Film } from "../models/index.js";

export const getAllAwards = async (req, res) => {
  try {
    const awards = await Award.findAll({ include: [{ model: Film, as: "films" }] });
    res.json(awards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAward = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: "Le nom est requis" });
    const award = await Award.create({ name, description });
    res.status(201).json(award);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAward = async (req, res) => {
  try {
    const award = await Award.findByPk(req.params.id);
    if (!award) return res.status(404).json({ error: "Award non trouvé" });
    await award.update(req.body);
    res.json(award);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAward = async (req, res) => {
  try {
    const award = await Award.findByPk(req.params.id);
    if (!award) return res.status(404).json({ error: "Award non trouvé" });
    await award.destroy();
    res.json({ message: "Award supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const assignFilm = async (req, res) => {
  try {
    const award = await Award.findByPk(req.params.id);
    if (!award) return res.status(404).json({ error: "Award non trouvé" });
    const film = await Film.findByPk(req.body.film_id || req.body.id_film);
    if (!film) return res.status(404).json({ error: "Film non trouvé" });
    await award.addFilm(film);
    const result = await Award.findByPk(award.id, { include: [{ model: Film, as: "films" }] });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeFilm = async (req, res) => {
  try {
    const award = await Award.findByPk(req.params.id);
    if (!award) return res.status(404).json({ error: "Award non trouvé" });
    const film = await Film.findByPk(req.params.filmId);
    if (!film) return res.status(404).json({ error: "Film non trouvé" });
    await award.removeFilm(film);
    res.json({ message: "Film retiré du prix" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
