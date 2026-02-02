import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Tag = sequelize.define("Tag", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
}, {
  tableName: "tags",
  timestamps: false,
  freezeTableName: true,
});

export default Tag;
