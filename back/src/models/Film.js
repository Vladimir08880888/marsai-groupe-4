import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Film = sequelize.define("Film", {
  id_film: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titre: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  titre_original: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: "",
  },
  titre_anglais: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: "",
  },
  duree: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  type: {
    type: DataTypes.ENUM("hybride", "total_ia"),
    allowNull: true,
  },
  langue: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: "",
  },
  synopsis_original: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  synopsis_anglais: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  processus_creatif: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  outils: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  url_youtube: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: "",
  },
  video_file: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: "",
  },
  image_principale: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: "",
  },
  sous_titres_srt: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: "",
  },
  statut: {
    type: DataTypes.ENUM("soumis_selection", "a_discuter", "refuse", "retenu", "finaliste"),
    allowNull: false,
    defaultValue: "soumis_selection",
  },
  rgpd_accepte: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  id_utilisateur: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "film",
  timestamps: false,
});

export default Film;
