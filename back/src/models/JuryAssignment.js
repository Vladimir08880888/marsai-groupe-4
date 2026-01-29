import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const JuryAssignment = sequelize.define("JuryAssignment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_film: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_jury: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "jury_assignment",
  timestamps: false,
});

export default JuryAssignment;
