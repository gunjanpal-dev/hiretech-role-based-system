import { useSelector } from "react-redux";
import JobCard from "./JobCard";
import { selectFilteredJobs } from "../redux/jobSelectors";

const JobList = () => {
  const jobs = useSelector(selectFilteredJobs);
   console.log("Filtered jobs:", jobs);
  const loading = useSelector((state) => state.jobs.loading);

  if (loading)
    return (
      <p className="text-center text-xl text-[#7A1C3C] font-semibold">
        Loading jobs...
      </p>
    );

  if (!jobs.length)
    return (
      <p className="text-center text-xl text-[#7A1C3C] font-semibold">
        No jobs available.
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default JobList;