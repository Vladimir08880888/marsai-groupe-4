import "../models/index.js";
import sequelize from "./connection.js";
import User from "../models/User.js";
import { hashPassword } from "../utils/password.js";

const USERS = [
  { first_name: "Admin", last_name: "MarsAI", email: "admin@marsai.io", password: "admin123", role: "ADMIN" },
  { first_name: "Jury", last_name: "Member", email: "jury1@marsai.io", password: "jury123", role: "JURY" },
  { first_name: "Producer", last_name: "Test", email: "producer1@marsai.io", password: "prod123", role: "PRODUCER" },
];

async function seed() {
  try {
    await sequelize.sync({ alter: true });
    console.log("Base synchronisée.");

    for (const u of USERS) {
      const exists = await User.findOne({ where: { email: u.email } });
      if (exists) {
        console.log(`  ✓ ${u.email} existe déjà (${u.role})`);
        continue;
      }
      const hash = await hashPassword(u.password);
      await User.create({ ...u, password: hash });
      console.log(`  + ${u.email} créé (${u.role})`);
    }

    console.log("\nSeed terminé !");
    process.exit(0);
  } catch (err) {
    console.error("Erreur seed:", err.message);
    process.exit(1);
  }
}

seed();
