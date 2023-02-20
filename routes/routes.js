import express from "express";
import testController from "../controllers/testController.js";

// USERS
import createUserController from "../controllers/users/createUserController.js";
import readAllUsersController from "../controllers/users/readAllUsersController.js";
import updateUserController from "../controllers/users/updateUserController.js";
import deleteUserController from "../controllers/users/deleteUserController.js";
import readUserController from "../controllers/users/readUserController.js";

const router = express.Router();

router.get("/", testController);

// routes related to users
router.post("/createUser", createUserController);
router.get("/readUsers", readAllUsersController);
router.post("/updateUser", updateUserController);
router.post("/deleteUser", deleteUserController);
router.post("/readUser", readUserController);

export default router;
