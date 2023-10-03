import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import Todo from "../models/Todo.js";
import User from "../models/User.js";
import { StatusCode } from "../utils/constants.js";

export const updateTodo = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "Validation error",
        error.mapped()
      )
    );
  }

  try {
    //const { todo_id, newDesc } = req.body;

    // Update the todo by ID

    
    const updatedTodo = await Todo.findOneAndUpdate(
      {
       // _id: todo_id,
        // updated code
        _id: req.body.todo_id,
       // userId: req.userId, // Make sure the user owns the todo
      },
      {
        desc: req.body.desc,
      },
      { new: true } // To get the updated document
    );

    if (!updatedTodo) {
      return res.json(
        jsonGenerate(StatusCode.NOT_FOUND, "Todo not found or not authorized")
      );
    }

    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "Todo updated successfully", updatedTodo)
    );
  } catch (error) {
    return res.json(
      jsonGenerate(
        StatusCode.UNPROCESSABLE_ENTITY,
        "Could not update the todo",
        error.message
      )
    );
  }
};
