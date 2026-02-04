import { Op } from "sequelize";
import Video from "../models/Video.js";
import User from "../models/User.js";

// Liste
async function getVideos(req, res) {

 try {
    const videos = await Video.findAll({ 
      where: { youtube_link: { [Op.ne]: null } },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'first_name', 'last_name', 'email']
      }]
    });
    const videoCount = await Video.count({ where: { youtube_link: { [Op.ne]: null } } });

    const stats = {
      totalVideos: videoCount,
      showVideos: videos
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
}


// Création
function createVideo(req, res) {
  if (!req.body) {
    return res.status(400).json({ error: "Données manquantes" });
  }

  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  Video.findOne({ where: { title } }).then((video) => {
    if (video) {
      res.json(video);
    } else {
      Video.create({ title: title, description: description }).then(
        (newVideo) => {
          res.status(201).json(newVideo);
        },
      );
    }
  });
}

export default { getVideos, createVideo };
