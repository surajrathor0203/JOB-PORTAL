import express from "express";
import userAuth from "../middelwares/authmiddleware.js";
import { updateUserController } from "../controllers/userController.js";

//route object 
const router = express.Router()

//routers
//GET USERS ||GET


// UPDATE USER || PUT

router.put('/update-user', userAuth, updateUserController)

export default router