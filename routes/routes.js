import express from "express";
import testController from "../controllers/testController.js";
import createUserController from "../controllers/users/createUserController.js";

const router = express.Router();

router.get("/", testController);

// routes related to users
router.post("/createUser", createUserController);

export default router;
