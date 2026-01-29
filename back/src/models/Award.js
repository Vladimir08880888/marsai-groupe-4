import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Award = sequelize.define("Award", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: "award",
  timestamps: false,
});

export default Award;
