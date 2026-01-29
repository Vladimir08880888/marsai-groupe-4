import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const JuryAssignment = sequelize.define("JuryAssignment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  film_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  jury_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "jury_assignments",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  freezeTableName: true,
});

export default JuryAssignment;
