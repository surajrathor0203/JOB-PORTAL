import express from "express";
import { testPostController } from "../controllers/testcontroller.js";
import userAuth from "../middelwares/authmiddleware.js";

// //router object

const router = express.Router()

// // router
router.post('/test-post', userAuth, testPostController)

// //export
export default router