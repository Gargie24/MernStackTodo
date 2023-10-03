import { check } from "express-validator";

export const RegisterSchema = [
  check("username", "username is required")
    .exists()
    .isAlphanumeric()
    .withMessage("username should be alphanuermic chardcater only")
    .trim()
    .isLength({ min: 6, max: 32 }),

  check("password", "password is required and must be atleast 6 character long")
    .exists()
    .isLength({ min: 6, max: 100 })
    .trim(),
  check("email", "email is required").exists().isEmail(),
];
