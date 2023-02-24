import express from "express";
import testController from "../controllers/testController.js";
import uploadFileMiddleware from "../controllers/uploadFileMiddleware.js";

// USERS
import createUserController from "../controllers/users/createUserController.js";
import readAllUsersController from "../controllers/users/readAllUsersController.js";
import updateUserController from "../controllers/users/updateUserController.js";
import deleteUserController from "../controllers/users/deleteUserController.js";
import readUserController from "../controllers/users/readUserController.js";
import loginMiddleware from "../controllers/users/loginMiddleware.js";
import loginController from "../controllers/users/loginController.js";

// MESSAGES
import createMsgController from "../controllers/messages/createMsgController.js";

const router = express.Router();

router.get("/", testController);
// router.post("/uploadFile", uploadFile);

// routes related to users
router.post("/createUser", createUserController);
router.get("/readUsers", readAllUsersController);
router.post("/updateUser", uploadFileMiddleware, updateUserController);
router.post("/deleteUser", deleteUserController);
router.post("/readUser", readUserController);
router.post("/login", loginMiddleware, loginController);

// routes related to messages
router.post("/createMsg", createMsgController);

export default router;