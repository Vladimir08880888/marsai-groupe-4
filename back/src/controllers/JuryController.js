import { JuryAssignment, JuryVote, Film, User, Tag } from "../models/index.js";

export const assignFilm = async (req, res) => {
  try {
    const { film_id, jury_id } = req.body;
    const film = await Film.findByPk(film_id);
    if (!film) return res.status(404).json({ error: "Film non trouvé" });
    const jury = await User.findByPk(jury_id);
    if (!jury || jury.role !== "JURY") return res.status(400).json({ error: "Utilisateur jury invalide" });

    const existing = await JuryAssignment.findOne({ where: { film_id, jury_id } });
    if (existing) return res.status(400).json({ error: "Déjà assigné" });

    const assignment = await JuryAssignment.create({ film_id, jury_id });
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeAssignment = async (req, res) => {
  try {
    const assignment = await JuryAssignment.findByPk(req.params.id);
    if (!assignment) return res.status(404).json({ error: "Assignment non trouvé" });
    await assignment.destroy();
    res.json({ message: "Assignment supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const assignments = await JuryAssignment.findAll({
      include: [
        { model: Film, as: "film", include: [{ model: Tag, as: "tags" }] },
        { model: User, as: "jury", attributes: ["id", "first_name", "last_name", "email"] },
      ],
    });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyAssignments = async (req, res) => {
  try {
    const assignments = await JuryAssignment.findAll({
      where: { jury_id: req.user.id },
      include: [{ model: Film, as: "film", include: [{ model: Tag, as: "tags" }] }],
    });

    const result = await Promise.all(assignments.map(async (a) => {
      const vote = await JuryVote.findOne({ where: { film_id: a.film_id, jury_id: req.user.id } });
      return { ...a.toJSON(), vote: vote ? vote.toJSON() : null };
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const vote = async (req, res) => {
  try {
    const { film_id, vote: voteValue, comment } = req.body;
    const jury_id = req.user.id;

    const assignment = await JuryAssignment.findOne({ where: { film_id, jury_id } });
    if (!assignment) return res.status(403).json({ error: "Film non assigné" });

    if (!["aime", "aime_pas"].includes(voteValue)) {
      return res.status(400).json({ error: "Vote invalide (aime/aime_pas)" });
    }

    const [juryVote, created] = await JuryVote.findOrCreate({
      where: { film_id, jury_id },
      defaults: { vote: voteValue, comment },
    });

    if (!created) {
      await juryVote.update({ vote: voteValue, comment });
    }

    res.json(juryVote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVotes = async (req, res) => {
  try {
    const votes = await JuryVote.findAll({
      include: [
        { model: Film, as: "film" },
        { model: User, as: "jury", attributes: ["id", "first_name", "last_name", "email"] },
      ],
    });
    res.json(votes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
