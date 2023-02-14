import express from "express";
import testController from "../controllers/testController.js";
import createUserController from "../controllers/users/createUserController.js";
import readAllUsersController from "../controllers/users/readAllUsersController.js";

const router = express.Router();

router.get("/", testController);

// routes related to users
router.post("/createUser", createUserController);
router.get("/readUsers", readAllUsersController);

export default router;
