import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,           // ou false si obligatoire
  },
  mobile: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  birth_date: {
    type: DataTypes.DATEONLY,  // ou DATE si heure incluse
    allowNull: true,
  },
  street: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  postal_code: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  biography: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  current_job: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  portfolio_url:    { type: DataTypes.STRING(255), allowNull: true },
  youtube_url:      { type: DataTypes.STRING(255), allowNull: true },
  instagram_url:    { type: DataTypes.STRING(255), allowNull: true },
  linkedin_url:     { type: DataTypes.STRING(255), allowNull: true },
  facebook_url:     { type: DataTypes.STRING(255), allowNull: true },
  tiktok_url:       { type: DataTypes.STRING(255), allowNull: true },
  discovery_source: { type: DataTypes.STRING(255), allowNull: true },

  role: {
    type: DataTypes.ENUM('ADMIN', 'JURY', 'DIRECTOR', 'PARTICIPANT'),
    defaultValue: 'PARTICIPANT',
    allowNull: false,
  },
}, {
  timestamps: true,          // created_at / updated_at
  tableName: 'Users',        // si table s'appelle exactement "Users"
  underscored: true,         // pour snake_case created_at au lieu de createdAt
});

export default User;
