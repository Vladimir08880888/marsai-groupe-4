import { Sequelize } from "sequelize";

const sequelize = new Sequelize("marsai", "root", "rootroot", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

sequelize.sync({ alter: true }).then(() => {
  console.log("La base de données est synchronisée.");
});

export default sequelize;
