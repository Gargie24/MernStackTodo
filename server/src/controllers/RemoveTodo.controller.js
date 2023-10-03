import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import Todo from "../models/Todo.js";
import User from "../models/User.js";
import { StatusCode } from "../utils/constants.js";

export const RemoveTodo = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "todo id is required",
        error.mapped()
      )
    );
  }
  try {
    
    await Todo.findOneAndDelete({
      _id: req.body.todo_id,
    });
    return res.status(200).json(jsonGenerate(StatusCode.SUCCESS, "TODO deleted", null));
   
  } catch (error) {
    return res.json(
      jsonGenerate(
        StatusCode.UNPROCESSABEL_ENTITY,
        "could not delete",
        error.message
      )
    );
  }
};
