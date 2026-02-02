import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const JuryVote = sequelize.define("JuryVote", {
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
  vote: {
    type: DataTypes.ENUM("aime", "aime_pas"),
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: "jury_votes",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  freezeTableName: true,
});

export default JuryVote;
