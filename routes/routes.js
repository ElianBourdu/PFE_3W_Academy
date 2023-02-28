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

// TOPICS
import createTopicController from "../controllers/topics/createTopicController.js";
import readAllTopicsController from "../controllers/topics/readAllTopicsController.js";
import updateTopicController from "../controllers/topics/updateTopicController.js";
import deleteTopicController from "../controllers/topics/deleteTopicController.js";
import readTopicController from "../controllers/topics/readTopicController.js";

// THREADS
import createThreadController from "../controllers/threads/createThreadController.js";
import readAllThreadsController from "../controllers/threads/readAllThreadsController.js";
import updateThreadController from "../controllers/threads/updateThreadController.js";
import deleteThreadController from "../controllers/threads/deleteThreadController.js";
import readThreadController from "../controllers/threads/readThreadController.js";

// MESSAGES
import createMsgController from "../controllers/messages/createMsgController.js";
import readAllMsgController from "../controllers/messages/readAllMsgController.js";
import updateMsgController from "../controllers/messages/updateMsgController.js";
import deleteMsgController from "../controllers/messages/deleteMsgController.js";
import readMsgController from "../controllers/messages/readMsgController.js";

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

// routes related to topics
router.post("/createTopic", createTopicController);
router.get("/readTopics", readAllTopicsController);
router.post("/updateTopic", updateTopicController);
router.post("/deleteTopic", deleteTopicController);
router.post("/readTopic", readTopicController);

// routes related to threads
router.post("/createThread", createThreadController);
router.get("/readThreads", readAllThreadsController);
router.post("/updateThread", updateThreadController);
router.post("/deleteThread", deleteThreadController);
router.post("/readThread", readThreadController);

// routes related to messages
router.post("/createMessage", createMsgController);
router.get("/readMessages", readAllMsgController);
router.post("/updateMessage", updateMsgController);
router.post("/deleteMessage", deleteMsgController);
router.post("/readMessage", readMsgController);

export default router;