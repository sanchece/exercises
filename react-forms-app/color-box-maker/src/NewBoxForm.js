import React, { useState } from "react";
import { v4 as uuid } from 'uuid';

const NewBoxForm = ({ addBox }) => {
  const [boxData, setBoxData] = useState({height: "", width: "", backgroundColor: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBoxData((boxData) => ({ ...boxData, [name]: value }));
    console.log(boxData)
  };
  const handleSubmit = (e) => {
      e.preventDefault();
    addBox({...boxData,id:uuid()});
    setBoxData({height: "",width: "",backgroundColor: ""})

  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="width">Insert Width:</label>
        <input
          id="width"
          type="text"
          name="width"
          onChange={handleChange}
          value={boxData.width}
        />
      </div>
      <div>
        <label htmlFor="height">Insert Height:</label>
        <input
          id="height"
          type="text"
          name="height"
          onChange={handleChange}
          value={boxData.height}
        />
      </div>
      <div>
        <label htmlFor="backgroundColor">Insert Background Color:</label>
        <input
          id="backgroundColor"
          type="text"
          name="backgroundColor"
          onChange={handleChange}
          value={boxData.backgroundColor}
        />
      </div>
      <button id="newBoxButton">click to Add new box</button>
    </form>
  );
};

export default NewBoxForm;
