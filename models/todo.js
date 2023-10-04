import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("tasks", "root", "12345678@zzZZ", {
  dialect: "mysql",
  logging: false, // Disable SQL logs
});

export const Todos = sequelize.define(
  "todo",
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
Todos.sync();
