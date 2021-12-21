import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import CompanyJobList from "../jobs/CompanyJobList";
import 'react-calendar/dist/Calendar.css';

const CompanyDetail = () => {
  const { company } = useParams();
  const [companyDetails, setCompanyDetails] = useState(null);
  useEffect(
    function mountCompanyDetails() {
      fetchCompanyDetails();
    },
    [company]
  );
  async function fetchCompanyDetails() {
    let fetchedCompanyDetails = await JoblyApi.getCompany(company);
    console.log("fetched details:", fetchedCompanyDetails);
    setCompanyDetails(fetchedCompanyDetails);
  }

  if (!companyDetails) return <div> not found </div>;

  return (
    <div>
      <h2>{companyDetails.name}</h2>
      <div>{companyDetails.description}</div>
      <CompanyJobList jobs={companyDetails.jobs} />
    </div>
  );
};

export default CompanyDetail;
