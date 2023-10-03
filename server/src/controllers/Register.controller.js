import { validationResult } from "express-validator";
import { StatusCode, JWT_TOKEN_SECRET } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";
import user from "../models/User.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const Register = async (req, res) => {
  const errors = validationResult(req);
  
  if (errors.isEmpty()) {
    try {
      const { name, username, password, email } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const userExist = await user.findOne({
        $or: [
          {
            email: email,
          },
          {
            username: username,
          },
        ],
      });

      if (userExist) {
        return res.json(
          jsonGenerate(
            StatusCode.UNPROCESSABEL_ENTITY,
            "User or email already exists"
          )
        );
      }

      // Save user to the database
      const result = await user.create({
        name: name,
        email: email,
        password: hashPassword,
        username: username,
      });

      const token = Jwt.sign({ userId: result._id }, JWT_TOKEN_SECRET);

      return res.json(
        jsonGenerate(StatusCode.SUCCESS, "REGISTRATION SUCCESSFUL", {
          userId: result._id,
          token: token,
        })
      );
    } catch (error) {
      console.error(error);
      return res.status(500).json(
        jsonGenerate(
          StatusCode.INTERNAL_SERVER_ERROR,
          "An error occurred while processing your request"
        )
      );
    }
  } else {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "error",
        errors.mapped()
      )
    );
  }
};

export default Register;
