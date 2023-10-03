import express from "express";
import Register from "../controllers/Register.controller.js";
import Login from "../controllers/Login.controller.js";
import { RegisterSchema } from "../validationSchema/RegisterSchema.js";
import { LoginSchema } from "../validationSchema/LoginSchema.js";
import { createTodo } from "../controllers/Todo.controller.js";
import { check } from "express-validator";
import { GetTodos } from "../controllers/TodoList.controller.js";
import { MarkTodo } from "../controllers/MarkTodo.controller.js";
import { RemoveTodo } from "../controllers/RemoveTodo.controller.js";
import {updateTodo} from "../controllers/update.controller.js";
const apiRoute = express.Router();
export const apiProtected = express.Router();

apiRoute.post("/register", RegisterSchema, Register);
apiRoute.post("/Login", LoginSchema, Login);

//protected routes

apiProtected.post(
  "/createTodo",
  [check("desc", "todo desc is required").exists()],
  createTodo
);

apiProtected.get("/todolist", GetTodos);
apiProtected.post(
  "/marktodo",
  [check("todo_id", "todo id is required").exists()],
  MarkTodo
);

apiProtected.post(
  "/deletetodo",
  [check("todo_id", "todo id is required").exists()],
  RemoveTodo
);

apiProtected.post(
  "/updatetodo",
  [check("todo_id", "todo id is required").exists()],
  updateTodo
);

export default apiRoute;
