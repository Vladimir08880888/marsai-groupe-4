import User from "../models/User.js";
import { hashPassword } from "../utils/password.js";

function getUsers(req, res) {
  User.findAll().then((users) => {
    res.json(users);
  });
}

function createUser(req, res) {
  if (!req.body) {
    return res.status(400).json({ error: "Données manquantes" });
  }

  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  User.findOne({ where: { email } }).then(async (existingEmail) => {
    if (existingEmail) {
      return res.json({ message: "Email déjà utilisé", user: existingEmail });
    }

    const hash = await hashPassword(password);
    User.create({ first_name, last_name, email, password: hash })
      .then((newUser) => {
        const { password, ...safeUser } = newUser.dataValues;
        res.status(201).json({ message: "Utilisateur créé", newUser: safeUser });
      });
  });
}

function deleteUser(req, res) {
  const { id } = req.params;
  User.destroy({ where: { id } }).then(() => {
    res.status(204).json({ message: "Utilisateur supprimé" });
  });
}

function updateUser(req, res) {
  const { id } = req.params;
  const { first_name, last_name, email, password, role } = req.body;

  User.findOne({ where: { id } }).then((user) => {
    if (user) {
      user.first_name = first_name || user.first_name;
      user.last_name = last_name || user.last_name;
      user.email = email || user.email;
      user.password = password || user.password;
      user.role = role || user.role;

      user.save().then((updatedUser) => {
        res.json(updatedUser);
      });
    } else {
      res.status(404).json({ error: "Utilisateur non trouvé" });
    }
  });
}

function getUserById(req, res) {
  const { id } = req.params;
  User.findOne({ where: { id } }).then((user) => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "Utilisateur non trouvé" });
    }
  });
}

function findUserByEmail(email) {
  return User.findOne({ where: { email } });
}

export default {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
  findUserByEmail,
};
