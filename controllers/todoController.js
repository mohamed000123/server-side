import { Op } from "sequelize";
import { Todos } from "../models/todo.js";

export const allTodos = (req, res) => {
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
};

export const addTodo = (req, res) => {
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
};

export const editTodo = (req, res) => {
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
};

export const deleteTodo = (req, res) => {
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
};
