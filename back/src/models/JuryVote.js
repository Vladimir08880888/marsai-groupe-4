import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const JuryVote = sequelize.define("JuryVote", {
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
  vote: {
    type: DataTypes.ENUM("aime", "aime_pas"),
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: "jury_vote",
  timestamps: true,
});

export default JuryVote;
