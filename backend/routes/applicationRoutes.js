const express=require("express")
const router=express.Router()

const uploadResume = require("../middleware/uploadResume")
const { applyForJob, getApplicationsForJob, getMyApplications, updateApplicationStatus } = require("../controllers/applicationController")
const authMiddleware=require("../middleware/authMiddleware")
const roleMiddleware=require("../middleware/roleMiddleware")


router.post("/apply",authMiddleware,roleMiddleware("candidate"),uploadResume.single("resume"),applyForJob)

router.get("/getjobapplications/:jobId",authMiddleware,roleMiddleware("recruiter"),getApplicationsForJob)

router.get("/myapplications",authMiddleware,roleMiddleware("candidate"),getMyApplications)

router.put("/:id/status",authMiddleware,roleMiddleware("recruiter"),updateApplicationStatus)

module.exports=router