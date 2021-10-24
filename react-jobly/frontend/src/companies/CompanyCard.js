import { Link } from "react-router-dom";

const CompanyCard = (props) => {
  return (
    <div>
      <Link to={`/companies/${props.handle}`}>
        <div>
          <h3>{props.name}</h3>
        </div>{" "}
      </Link>
      <div>{props.description}</div>
    </div>
  );
};

export default CompanyCard;
