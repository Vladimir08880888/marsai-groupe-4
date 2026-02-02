import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Film = sequelize.define(
  "Film",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    original_title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    translated_title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("hybride", "total_ia"),
      allowNull: true,
    },
    language: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    synopsis_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    creative_process: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ai_tools: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    youtube_link: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    video_file: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    thumbnail: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    image_2: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    image_3: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    subtitles: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("submitted", "under_review", "rejected", "selected", "finalist"),
      allowNull: false,
      defaultValue: "submitted",
    },
    rgpd_accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "films",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);

export default Film;
