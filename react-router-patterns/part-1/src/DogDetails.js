import React from "react";
import { useParams, Link } from "react-router-dom";

const DogDetails = ({ dogs }) => {
  const { name } = useParams();

  if (name) {
    const currentDog = dogs.find(
      (dog) => dog.name.toLowerCase() === name.toLowerCase()
    );
    return (
      <div>
        <div>Name:{currentDog.name}</div>
        <div>Age:{currentDog.age}</div>
        <img src={currentDog.src} style={{ width: "10em" }} />
        <ul>
          {currentDog.facts.map((fact, i) => (
            <li key={i}>{fact}</li>
          ))}
        </ul>
        <Link to="/dogs">Home</Link>
      </div>
    );
  }

  return null;
};
export default DogDetails;
