import express from "express";
import {
  allTodos,
  addTodo,
  editTodo,
  deleteTodo,
} from "../controllers/todoController.js";
const router = express.Router();
router.get("/:query?", allTodos);
router.post("/", addTodo);
router.put("/:id", editTodo);
router.delete("/:id", deleteTodo);

export default router;
