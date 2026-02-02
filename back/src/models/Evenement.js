import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Evenement = sequelize.define("Evenement", {
  id_evenement: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: "",
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  lieu: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: "",
  },
  type: {
    type: DataTypes.ENUM("conference", "projection", "workshop"),
    allowNull: false,
    defaultValue: "conference",
  },
}, {
  tableName: "evenement",
  timestamps: false,
});

export default Evenement;
