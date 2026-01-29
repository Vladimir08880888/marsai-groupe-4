import { JuryAssignment, JuryVote, Film, User, Tag } from "../models/index.js";

export const assignFilm = async (req, res) => {
  try {
    const { id_film, id_jury } = req.body;
    const film = await Film.findByPk(id_film);
    if (!film) return res.status(404).json({ error: "Film non trouvé" });
    const jury = await User.findByPk(id_jury);
    if (!jury || jury.role !== "JURY") return res.status(400).json({ error: "Utilisateur jury invalide" });

    const existing = await JuryAssignment.findOne({ where: { id_film, id_jury } });
    if (existing) return res.status(400).json({ error: "Déjà assigné" });

    const assignment = await JuryAssignment.create({ id_film, id_jury });
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
        { model: User, as: "jury", attributes: ["id", "username"] },
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
      where: { id_jury: req.user.id },
      include: [{ model: Film, as: "film", include: [{ model: Tag, as: "tags" }] }],
    });

    // Include vote status for each assignment
    const result = await Promise.all(assignments.map(async (a) => {
      const vote = await JuryVote.findOne({ where: { id_film: a.id_film, id_jury: req.user.id } });
      return { ...a.toJSON(), vote: vote ? vote.toJSON() : null };
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const vote = async (req, res) => {
  try {
    const { id_film, vote: voteValue, comment } = req.body;
    const id_jury = req.user.id;

    // Check assignment
    const assignment = await JuryAssignment.findOne({ where: { id_film, id_jury } });
    if (!assignment) return res.status(403).json({ error: "Film non assigné" });

    if (!["aime", "aime_pas"].includes(voteValue)) {
      return res.status(400).json({ error: "Vote invalide (aime/aime_pas)" });
    }

    const [juryVote, created] = await JuryVote.findOrCreate({
      where: { id_film, id_jury },
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
        { model: User, as: "jury", attributes: ["id", "username"] },
      ],
    });
    res.json(votes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
