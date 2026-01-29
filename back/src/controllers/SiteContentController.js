import { SiteContent } from "../models/index.js";

export const getAll = async (req, res) => {
  try {
    const contents = await SiteContent.findAll();
    const result = {};
    contents.forEach((c) => {
      result[c.key] = { value: c.value, type: c.type };
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getByKey = async (req, res) => {
  try {
    const content = await SiteContent.findOne({ where: { key: req.params.key } });
    if (!content) return res.status(404).json({ error: "Contenu non trouvé" });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const upsert = async (req, res) => {
  try {
    const { key, value, type } = req.body;
    if (!key) return res.status(400).json({ error: "La clé est requise" });

    const [content, created] = await SiteContent.findOrCreate({
      where: { key },
      defaults: { value, type: type || "text" },
    });

    if (!created) {
      await content.update({ value, type: type || content.type });
    }

    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
