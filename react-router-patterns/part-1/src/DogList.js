import React from "react";
import { Link } from "react-router-dom";


function DogList({dogs}) {
  return (
    <div className="DogList">
      <div>
        {dogs.map(dog=>(
          <div>
          <Link exact to={`dogs/${dog.name}`}>{dog.name}</Link>
          </div>

        ))}
      </div>
      dog lists
    </div>
  );
}

export default DogList;
