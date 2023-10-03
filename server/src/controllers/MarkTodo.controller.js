import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constants.js";
import Todo from "../models/Todo.js";
export const MarkTodo = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "todo id is created",
        error.mapped()
      )
    );
  }
  try{
     const todo = await Todo.findOneAndUpdate(
        {
            _id: req.body.todo_id,
            userId : req.userId,
        },[
            {
                $set :{
                    isCompleted:{
                        $eq:[false,"$isCompleted"]
                    }
                }
            }
        ]
     );
    if(todo){
        return res.json(jsonGenerate(StatusCode.SUCCESS,"updated",todo));
    }
  }
  catch(error){
      return res.json(jsonGenerate(StatusCode.UNPROCESSABEL_ENTITY,"could not update",null));
  }
};
