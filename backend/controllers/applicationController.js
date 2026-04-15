const Application = require("../models/application");
const Job = require("../models/job");


// Apply for a Job (Candidate Only)
const applyForJob = async (req, res) => {
  try {
    console.log("Req body:", req.body);
console.log("Req file:", req.file);
    const { jobId } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      candidate: req.user.id,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

    // Resume comes from multer (req.file.path)
    if (!req.file) {
      return res.status(400).json({
        message: "Resume is required",
      });
    }

    const application = new Application({
      job: jobId,
      candidate: req.user.id,
      resume: req.file.path,
    });

    await application.save();

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



//Get Applications for a Job(recruiter)
const getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ job: jobId })
      .populate("candidate", "name email")
      .populate("job", "title company");

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



// Get My Applications(candidate)
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.user.id,
    }).populate("job", "title company location");

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



//Update Application Status(recruiter)
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      message: "Application status updated",
      application,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports={applyForJob,getApplicationsForJob,getMyApplications,updateApplicationStatus}