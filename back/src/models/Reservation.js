import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Reservation = sequelize.define("Reservation", {
  id_reservation: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  profession: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: "",
  },
  id_evenement: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "reservation",
  timestamps: false,
});

export default Reservation;
