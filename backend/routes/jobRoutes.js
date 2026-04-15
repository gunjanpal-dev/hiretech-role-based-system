const express = require("express");
const {
  getAllJobs,
  getMyJobs,
  createJob,
  updateJob,
  deleteJob,
  getJobById,
} = require("../controllers/jobController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

//Public routes
router.get("/", getAllJobs);         // GET /api/jobs
router.get("/myjobs", authMiddleware, roleMiddleware("recruiter"), getMyJobs); // GET /api/jobs/myjobs

router.get("/:id", getJobById);      // GET /api/jobs/:id

// Recruiter-only routes
router.post("/", authMiddleware, roleMiddleware("recruiter"), createJob);      // POST /api/jobs
router.put("/:id", authMiddleware, roleMiddleware("recruiter"), updateJob);    // PUT /api/jobs/:id
router.delete("/:id", authMiddleware, roleMiddleware("recruiter"), deleteJob); // DELETE /api/jobs/:id

module.exports = router;