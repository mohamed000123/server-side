import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("tasks", "root", "12345678@zzZZ", {
  dialect: "mysql",
  logging: false, // Disable SQL logs
});
