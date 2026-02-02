import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const SiteContent = sequelize.define("SiteContent", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  key: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: "text",
  },
}, {
  tableName: "site_contents",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  freezeTableName: true,
});

export default SiteContent;
