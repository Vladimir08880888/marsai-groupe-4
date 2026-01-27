import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const User = sequelize.define("User", {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
  role: {
    type: DataTypes.ENUM("ADMIN", "JURY", "PRODUCER"),
    defaultValue: "PRODUCER",
    allowNull: false,
  },
});

export default User;
