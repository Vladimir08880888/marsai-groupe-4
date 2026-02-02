import "../models/index.js";
import sequelize from "./connection.js";
import User from "../models/User.js";
import Evenement from "../models/Evenement.js";
import { hashPassword } from "../utils/password.js";

const USERS = [
  { first_name: "Admin", last_name: "MarsAI", email: "admin@marsai.io", password: "admin123", role: "ADMIN" },
  { first_name: "Jury", last_name: "Member", email: "jury1@marsai.io", password: "jury123", role: "JURY" },
  { first_name: "Producer", last_name: "Test", email: "producer1@marsai.io", password: "prod123", role: "PRODUCER" },
];

async function seed() {
  try {
    await sequelize.sync({ force: false });
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

    // Seed événements
    const EVENEMENTS = [
      { titre: "Accueil & Café Networking", description: "Rencontrez les participants autour d'un café", date: "2026-06-13 09:30:00", lieu: "La Plateforme", type: "conference" },
      { titre: "Conférence d'ouverture : L'IA au service du Cinéma", description: "Keynote sur l'avenir de l'IA dans le cinéma", date: "2026-06-13 10:30:00", lieu: "La Plateforme", type: "conference" },
      { titre: "Projection Sélection Officielle", description: "Projection des films sélectionnés pour le festival", date: "2026-06-13 14:30:00", lieu: "La Plateforme", type: "projection" },
      { titre: "Table Ronde : Futurs Souhaitables", description: "Discussion sur les enjeux éthiques de l'IA créative", date: "2026-06-13 16:30:00", lieu: "La Plateforme", type: "conference" },
      { titre: "Grand Prix & Cérémonie de Clôture", description: "Remise des prix et cérémonie officielle", date: "2026-06-13 19:00:00", lieu: "La Plateforme", type: "conference" },
      { titre: "Génération Vidéo : Les Bases", description: "Atelier pratique sur la génération vidéo par IA", date: "2026-06-13 14:30:00", lieu: "La Plateforme - Salle 1", type: "workshop" },
      { titre: "IA & Scénario : Co-écriture", description: "Apprendre à co-écrire un scénario avec l'IA", date: "2026-06-13 15:45:00", lieu: "La Plateforme - Salle 2", type: "workshop" },
      { titre: "Post-prod IA & Effets Spéciaux", description: "Techniques de post-production assistée par IA", date: "2026-06-13 17:00:00", lieu: "La Plateforme - Salle 1", type: "workshop" },
      { titre: "Éthique & Droit de l'IA", description: "Les questions juridiques liées à l'IA créative", date: "2026-06-13 18:15:00", lieu: "La Plateforme - Salle 2", type: "workshop" },
    ];

    const existingCount = await Evenement.count();
    if (existingCount === 0) {
      for (const e of EVENEMENTS) {
        await Evenement.create(e);
        console.log(`  + Événement créé : ${e.titre}`);
      }
    } else {
      console.log(`  ✓ ${existingCount} événements existent déjà`);
    }

    console.log("\nSeed terminé !");
    process.exit(0);
  } catch (err) {
    console.error("Erreur seed:", err.message);
    process.exit(1);
  }
}

seed();
