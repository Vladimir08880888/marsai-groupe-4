import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const YoutubeToken = sequelize.define("YoutubeToken", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  access_token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  refresh_token: {
    type: DataTypes.TEXT,
    allowNull: true, // parfois absent au premier login
  },
  scope: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  token_type: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  expiry_date: {
    type: DataTypes.BIGINT, // timestamp ms
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: "youtube_tokens",
});

export default YoutubeToken;