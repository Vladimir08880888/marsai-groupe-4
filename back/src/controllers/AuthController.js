import User from "../models/User.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import jwt from "jsonwebtoken";

function login(req, res) {
  const { username, password } = req.body;

  User.findOne({ where: { username } }).then((user) => {
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    comparePassword(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      });

      return res.status(200).json({
        message: "Login successful",
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        token,
      });
    });
  });
}

async function register(req, res) {
  try {
    const { username, email, password, rgpd_accepte } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username et password sont requis" });
    }

    if (!rgpd_accepte) {
      return res.status(400).json({ error: "Vous devez accepter les conditions RGPD" });
    }

    const existing = await User.findOne({ where: { username } });
    if (existing) {
      return res.status(400).json({ error: "Utilisateur déjà existant" });
    }

    const hash = await hashPassword(password);
    const user = await User.create({
      username,
      email: email || null,
      password: hash,
      role: "PRODUCER",
    });

    res.status(201).json({ message: "Inscription réussie", user: { id: user.id, username: user.username, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default { login, register };
