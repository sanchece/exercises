import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import JoblyApi from "../api";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(function () {
    fetchJobs();
  }, []);
  async function fetchJobs() {
    let jobs = await JoblyApi.getJobs();
    console.log("jobs fetched from API:", jobs);
    setJobs(jobs);
  }
  return (
    <div>
      {jobs.map((job) => (
        <JobCard
          title={job.title}
          salary={job.salary}
          company_handle={job.companyName}
          key={job.id}
          id={job.id}
        />
      ))}
    </div>
  );
};
export default JobList;
