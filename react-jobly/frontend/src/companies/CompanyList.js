import { useEffect, useState } from "react";
import JoblyApi from "../api";
import CompanyCard from "./CompanyCard";
import SearchForm from "../search/SearchForm";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(function mountCompanies() {
    fetchCompanies();
  }, []);

  async function fetchCompanies(company) {
    let companies = await JoblyApi.getCompanies(company);
    console.log("companies api res:", companies);
    setCompanies(companies);
  }

  return (
    <div>
      <SearchForm search={fetchCompanies} />

      {companies.map((company) => (
        <CompanyCard
          name={company.name}
          description={company.description}
          handle={company.handle}
        />
      ))}
    </div>
  );
};
export default CompanyList;
