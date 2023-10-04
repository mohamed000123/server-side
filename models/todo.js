import { sequelize } from "../models/dbConnection.js";
import { Sequelize } from "sequelize";

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
