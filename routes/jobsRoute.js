import express from "express";
import userAuth from "../middelwares/authmiddleware.js";
import { createJobController, deleteJobController, getAlljobsController, jobStatsController, updateJobController } from "../controllers/jobController.js";


const router = express.Router()

//router
//create JOB || POST
router.post('/create-job', userAuth, createJobController)

//GET JOB || GET
router.get('/get-job', userAuth, getAlljobsController)

//UPDATE JOB || PATCH
router.patch('/update-job/:id', userAuth, updateJobController)

//DELETE JOB || DELETE
router.delete('/delete-job/:id', userAuth, deleteJobController)

// JOBS STATS FILTER || DELETE
router.get('/job-stats', userAuth, jobStatsController)


export default router