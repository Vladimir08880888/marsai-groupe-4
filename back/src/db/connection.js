import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";

configDotenv();

const sequelize = new Sequelize(
  process.env.DB_NAME || "marsai",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
  }
);

sequelize.sync({ alter: true }).then(() => {
  console.log("La base de données est synchronisée.");
});

export default sequelize;
