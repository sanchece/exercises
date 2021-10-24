import React, { useEffect, useState, useContext } from "react";
import UserData from "../UserDataContext";

const JobCard = ({ title, salary, company_handle, id }) => {
  const { applyJob, checkIfApplied } = useContext(UserData);
  const [applied, setApplied] = useState(false);
  useEffect(
    function checkAppliedJobs() {
      setApplied(checkIfApplied(id));
    },
    [applied]
  );

  const handleApply = () => {
    // if (checkIfApplied(id)) return;
    applyJob(id);
    setApplied(true);
    console.log(applied);
  };

  return (
    <div>
      <div>
        <h3>{title}</h3>
      </div>
      <div>Salary: {salary}</div>
      <div>Company: {company_handle}</div>
      <button onClick={handleApply}>{applied ? "Applied" : "Apply"}</button>
    </div>
  );
};

export default JobCard;
