import User from "../models/User.js";
import { hashPassword } from "../utils/password.js";

// Liste
function getUsers(req, res) {
  User.findAll().then((users) => {
    res.json(users);
  });
}

// Création
function createUser(req, res) {
  console.log(req);

  if (!req.body) {
    return res.status(400).json({ error: "Données manquantes" });
  }

  const { first_name, last_name, email, password,} = req.body;

if (!first_name || !last_name || !email || !password ) {
  return res.status(400).json({ error: "Tous les champs sont requis" });
}

// Vérifie si email déjà utilisé
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

// Suppression
function deleteUser(req, res) {
  const { id } = req.params;
  User.destroy({ where: { id } }).then(() => {
    res.status(204).json({ message: "Utilisateur supprimé" });
  });
}

// Modification
async function updateUser(req, res) {
  const { id } = req.params;
  const { first_name, last_name, email, password, role } = req.body;

  User.findOne({ where: { id } }).then(async (user) => {
    if (user) {
      user.first_name = first_name || user.first_name;
      user.last_name = last_name || user.last_name;
      user.email = email || user.email;
      
      // Hash the password if it's being updated
      if (password) {
        user.password = await hashPassword(password);
      }
      
      user.role = role || user.role;

      user.save().then((updatedUser) => {
        res.json(updatedUser);
      });
    } else {
      res.status(404).json({ error: "Utilisateur non trouvé" });
    }
  });
}

// Récupérer un utilisateur par ID
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


function getRoles(req, res) {
  const roles = User.rawAttributes.role.values;
  res.json(roles);
}


export default {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
  findUserByEmail,
  getRoles,
};
