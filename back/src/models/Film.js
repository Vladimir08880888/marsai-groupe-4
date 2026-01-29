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
  traduction: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: "",
  },
  duree: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: "",
  },
  synopsis: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: "",
  },
  langue_principale: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: "",
  },
  synopsis_anglais: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: "",
  },
  lien_youtube: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: "",
  },
  sous_titre: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  outils_ia: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  vignette: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: "",
  },
  image2: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: "",
  },
  image3: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: "",
  },
  statut: {
    type: DataTypes.ENUM("soumis_selection", "a_discuter", "refuse", "retenu", "finaliste"),
    allowNull: false,
    defaultValue: "soumis_selection",
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
