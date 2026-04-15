
const Job=require("../models/job")


//recruiter only
const createJob=async(req,res)=>{
    try{
        const {title,description,company,location,salary,skillsRequired}=req.body
        const job=await Job.create({
            title,
            description,
            company,
            location,
            salary,
            skillsRequired,
            recruiter: req.user.id
        })
        res.status(201).json({message:"Job created ",job})

    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message });


    }
}
//everybody
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("recruiter", "name email");

    // Add applicants count for each job
    // for (let job of jobs) {
    //   job = job.toObject();
      
    // }

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//everybody
const getJobById = async (req, res) => {
  try {
     const job = await Job.findById(req.params.id).populate("recruiter", "name email");
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
 };

 //only recruiter
 const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Only the recruiter who created the job can update
    if (job.recruiter.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    Object.assign(job, req.body);
    await job.save();

    res.json({ message: "Job updated", job });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//only recruiter
const deleteJob = async (req, res) => {
  try {
     const job = await Job.findById(req.params.id);
     if (!job) return res.status(404).json({ message: "Job not found" });

     if (job.recruiter.toString() !== req.user.id)
       return res.status(403).json({ message: "Not authorized" });

     await job.deleteOne();
     res.json({ message: "Job deleted" });
   } catch (error) {
     res.status(500).json({ message: "Server error", error: error.message });
   }
 };

  // Get My Jobs (Recruiter dashboard)
const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.user.id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports={createJob,getAllJobs,getJobById,updateJob,deleteJob,getMyJobs}