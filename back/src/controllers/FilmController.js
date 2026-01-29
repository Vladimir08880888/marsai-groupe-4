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
      where: { status: ["selected", "finalist"] },
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
      where: { status },
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
      include: [{ model: Tag, as: "tags" }, { model: User, as: "user", attributes: ["id", "first_name", "last_name", "email"] }],
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

    if (req.user) {
      data.user_id = req.user.id;
    }

    if (!data.rgpd_accepted || data.rgpd_accepted === "false") {
      return res.status(400).json({ error: "Vous devez accepter les conditions RGPD" });
    }
    data.rgpd_accepted = true;

    if (req.files) {
      if (req.files.video_file?.[0]) {
        data.video_file = `/uploads/videos/${req.files.video_file[0].filename}`;
      }
      if (req.files.thumbnail?.[0]) {
        data.thumbnail = `/uploads/images/${req.files.thumbnail[0].filename}`;
      }
      if (req.files.subtitles?.[0]) {
        data.subtitles = `/uploads/videos/${req.files.subtitles[0].filename}`;
      }
    }

    if (!data.video_file && !data.youtube_link) {
      data.status = "under_review";
    }

    const film = await Film.create(data);

    if (data.tags) {
      const tagNames = typeof data.tags === "string" ? JSON.parse(data.tags) : data.tags;
      for (const name of tagNames) {
        const [tag] = await Tag.findOrCreate({ where: { name } });
        await film.addTag(tag);
      }
    }

    const result = await Film.findByPk(film.id, { include: [{ model: Tag, as: "tags" }] });
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
      if (req.files.thumbnail?.[0]) {
        data.thumbnail = `/uploads/images/${req.files.thumbnail[0].filename}`;
      }
      if (req.files.subtitles?.[0]) {
        data.subtitles = `/uploads/videos/${req.files.subtitles[0].filename}`;
      }
    }

    await film.update(data);

    if (data.tags) {
      const tagNames = typeof data.tags === "string" ? JSON.parse(data.tags) : data.tags;
      const tagInstances = [];
      for (const name of tagNames) {
        const [tag] = await Tag.findOrCreate({ where: { name } });
        tagInstances.push(tag);
      }
      await film.setTags(tagInstances);
    }

    const result = await Film.findByPk(film.id, { include: [{ model: Tag, as: "tags" }] });
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
