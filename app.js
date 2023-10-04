import express from "express";
import { Op } from "sequelize";
import cors from "cors";
import { Todos, sequelize } from "./models/todo.js";
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
app.get("/:query?", (req, res) => {
  if (req.params.query) {
    const searchText = req.params.query;
    Todos.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${searchText}%` } },
          { description: { [Op.like]: `%${searchText}%` } },
        ],
      },
    })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((e) => {
        res.status(200).json(e);
      });
  } else {
    Todos.findAll()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((e) => {
        res.status(500).json(e);
      });
  }
});

app.post("/", (req, res) => {
  Todos.create({
    title: req.body.title,
    description: req.body.description,
  })
    .then(() => {
      return res.status(200).json(`created ${req.body.title}`);
    })
    .catch((e) => {
      return res.status(500).json(`something went wrong" ${e}`);
    });
});
app.put("/:id", (req, res) => {
  Todos.update(
    { title: req.body.title, description: req.body.description },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(() => {
      return res.status(200).json(`to do updated successfully `);
    })
    .catch((e) => {
      return res.status(500).json(`something went wrong" ${e}`);
    });
});
app.delete("/:id", (req, res) => {
  Todos.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      return res.status(200).json(`to do deleted successfully `);
    })
    .catch((e) => {
      return res.status(500).json(`something went wrong" ${e}`);
    });
});
