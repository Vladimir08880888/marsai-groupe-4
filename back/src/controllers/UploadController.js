import Upload from "../models/Upload.js";

function getUpload(req, res) {
  Upload.findAll()
    .then((uploads) => res.json(uploads))
    .catch((error) => {
      console.error("Erreur lors de la récupération des uploads :", error);
      res.status(500).json({ error: "Erreur serveur" });
    });
}

function getUploadbyId(req, res) {
  const { id } = req.params;

  Upload.findOne({ where: { id } })
    .then((upload) => {
      if (upload) {
        res.json(upload);
      } else {
        res.status(404).json({ error: "Upload non trouvé" });
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la recuperation de l'upload :", error);
      res.status(500).json({ error: "Erreur serveur" });
    });
}

async function createUpload(req, res) {
  try {
    const userId = req.userId;
    const {
      title,
      translated_title,
      duration,
      synopsis,
      language,
      synopsis_en,
      youtube_link,
      subtitles,
      ai_tools,
      thumbnail,
      image_2,
      image_3,
    } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Le titre est requis" });
    }
    const newFilm = await Upload.create({
      title,
      translated_title: translated_title || null,
      duration: duration || null,
      synopsis: synopsis || null,
      language: language || null,
      synopsis_en: synopsis_en || null,
      youtube_link: youtube_link || null,
      status: "submitted",
      subtitles: subtitles || null,
      ai_tools: ai_tools || null,
      thumbnail: thumbnail || null,
      image_2: image_2 || null,
      image_3: image_3 || null,
      user_id: userId,
    });
    res.status(201).json({
      message: "Film uploadé avec succès",
      film: newFilm,
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'upload :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

// A voir si utilisé ou pas
async function updateUpload(req, res) {
  try {
    const { id } = req.params;
    const UserId = req.userId;
    const role = req.user.role;

    const film = await Upload.findOne({ where: { id } });
    if (!film) {
      return res.status(404).json({ error: "Film non trouvé" });
    }

    if (film.user_id !== UserId && role !== "ADMIN") {
      return res
        .status(403)
        .json({ error: "Accès refusé pour modifier ce film" });
    }

    const updated = await film.update(req.body);
    res.json({
      message: "Film mis à jour avec succès",
      film: updated,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'upload :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

async function deleteUpload(req, res) {
  const { id } = req.params;
  const UserId = req.userId;
  const role = req.user.role;

  const upload = await Upload.findOne({ where: { id } });
  if (!upload) {
    return res.status(404).json({ error: "Upload non trouvé" });
  }

  if (upload.user_id !== UserId && role !== "ADMIN") {
    return res.status(403).json({ error: "Accès refusé pour supprimer cet upload" });
  }
  Upload.destroy({ where: { id } }).then(() => {
    res.status(204).json({ message: "Uploads supprimé" });
  });
}

export default {
  createUpload,
  getUpload,
  getUploadbyId,
  updateUpload,
  deleteUpload,
};
