import Film from "../models/Film.js";

export const getAllFilms = async (req, res) => {
  try {
    const films = await Film.findAll();
    res.json(films);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFilmsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const films = await Film.findAll({
      where: { statut: status },
    });
    res.json(films);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFilmById = async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Film.findByPk(id);
    if (!film) {
      return res.status(404).json({ error: "Film non trouvé" });
    }
    res.json(film);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createFilm = async (req, res) => {
  try {
    const film = await Film.create(req.body);
    res.status(201).json(film);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateFilm = async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Film.findByPk(id);
    if (!film) {
      return res.status(404).json({ error: "Film non trouvé" });
    }
    await film.update(req.body);
    res.json(film);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteFilm = async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Film.findByPk(id);
    if (!film) {
      return res.status(404).json({ error: "Film non trouvé" });
    }
    await film.destroy();
    res.json({ message: "Film supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
