import express from "express";
import { createUser, getUser, getUsers, deleteUser, updateUser } from "../controllers/userController.js";
import { createUserSchema, getUserSchema } from "../validators/userValidator.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.post("/", validate(createUserSchema), createUser);
router.get("/:id", validate(getUserSchema, "params"), getUser);
router.get("/", getUsers);
router.delete("/:id", validate(getUserSchema, "params"), deleteUser);
router.put("/:id", validate(getUserSchema, "params"), validate(createUserSchema, "body"), updateUser);

export default router;
