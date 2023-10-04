import express from "express";
import cors from "cors";
import { sequelize } from "./models/dbConnection.js";
import todosRouter from "./routes/todoRoute.js";
const app = express();

//** connecting to data base **//

sequelize
  .authenticate()
  .then(() => {
    app.listen("8000", () => {
      console.log("server is running on port 8000");
    });
  })
  .catch((e) => {
    console.log("error connecting to db", e);
  });

app.use(express.json());
app.use(cors());

// todos route
app.use("/", todosRouter);
