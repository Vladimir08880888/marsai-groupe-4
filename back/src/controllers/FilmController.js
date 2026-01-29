import { Film, User, Tag } from "../models/index.js";

export const getAllFilms = async (req, res) => {
  try {
    const films = await Film.findAll({ include: [{ model: Tag, as: "tags" }] });
    res.json(films);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPublicFilms = async (req, res) => {
  try {
    const films = await Film.findAll({
      where: { statut: ["retenu", "finaliste"] },
      include: [{ model: Tag, as: "tags" }],
    });
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
      include: [{ model: Tag, as: "tags" }],
    });
    res.json(films);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFilmById = async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Film.findByPk(id, {
      include: [{ model: Tag, as: "tags" }, { model: User, as: "user", attributes: ["id", "username"] }],
    });
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
    const data = { ...req.body };

    // Set user from auth
    if (req.user) {
      data.id_utilisateur = req.user.id;
    }

    // RGPD check
    if (!data.rgpd_accepte || data.rgpd_accepte === "false") {
      return res.status(400).json({ error: "Vous devez accepter les conditions RGPD" });
    }
    data.rgpd_accepte = true;

    // Handle file uploads
    if (req.files) {
      if (req.files.video_file?.[0]) {
        data.video_file = `/uploads/videos/${req.files.video_file[0].filename}`;
      }
      if (req.files.image_principale?.[0]) {
        data.image_principale = `/uploads/images/${req.files.image_principale[0].filename}`;
      }
      if (req.files.sous_titres_srt?.[0]) {
        data.sous_titres_srt = `/uploads/videos/${req.files.sous_titres_srt[0].filename}`;
      }
    }

    // Auto-flag: no video and no youtube = a_discuter
    if (!data.video_file && !data.url_youtube) {
      data.statut = "a_discuter";
    }

    const film = await Film.create(data);

    // Handle tags
    if (data.tags) {
      const tagNames = typeof data.tags === "string" ? JSON.parse(data.tags) : data.tags;
      for (const name of tagNames) {
        const [tag] = await Tag.findOrCreate({ where: { name } });
        await film.addTag(tag);
      }
    }

    const result = await Film.findByPk(film.id_film, { include: [{ model: Tag, as: "tags" }] });
    res.status(201).json(result);
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

    const data = { ...req.body };

    if (req.files) {
      if (req.files.video_file?.[0]) {
        data.video_file = `/uploads/videos/${req.files.video_file[0].filename}`;
      }
      if (req.files.image_principale?.[0]) {
        data.image_principale = `/uploads/images/${req.files.image_principale[0].filename}`;
      }
      if (req.files.sous_titres_srt?.[0]) {
        data.sous_titres_srt = `/uploads/videos/${req.files.sous_titres_srt[0].filename}`;
      }
    }

    await film.update(data);

    // Handle tags
    if (data.tags) {
      const tagNames = typeof data.tags === "string" ? JSON.parse(data.tags) : data.tags;
      const tagInstances = [];
      for (const name of tagNames) {
        const [tag] = await Tag.findOrCreate({ where: { name } });
        tagInstances.push(tag);
      }
      await film.setTags(tagInstances);
    }

    const result = await Film.findByPk(film.id_film, { include: [{ model: Tag, as: "tags" }] });
    res.json(result);
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
