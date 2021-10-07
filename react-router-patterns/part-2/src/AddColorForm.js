import React, {useState} from "react";
import { useHistory } from "react-router-dom";

const AddColorForm = ({ addColor }) => {
  const [newColor, setNewColor] = useState({ name: "", code: "" });
  const history = useHistory();

  const handleChange=(e)=>{
      const  {name,value}=e.target;
      setNewColor((newColor=>({...newColor,[name]:value})))
      
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newColor)
    addColor(newColor);
    history.push("/colors")
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" onChange={handleChange} value={newColor.name}
        ></input>
      </div>
      <div>
          <label htmlFor="code">Code:</label>
          <input id="code" name="code" onChange={handleChange} value={newColor.code}></input>
      </div>
      <button onClick={handleSubmit}>Add</button>
    </form>
  );
};

export default AddColorForm;
