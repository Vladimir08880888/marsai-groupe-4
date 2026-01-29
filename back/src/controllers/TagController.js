import { Tag } from "../models/index.js";

export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTag = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Le nom est requis" });
    const [tag, created] = await Tag.findOrCreate({ where: { name } });
    res.status(created ? 201 : 200).json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ error: "Tag non trouvé" });
    await tag.destroy();
    res.json({ message: "Tag supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
