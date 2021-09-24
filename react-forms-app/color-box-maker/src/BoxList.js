import Box from "./Box";
import NewBoxForm from "./NewBoxForm";
import React, { useState } from "react";

const BoxList = () => {
  const [boxes, setBoxes] = useState([]);

  const removeBox = (id) => {
    setBoxes((boxes) => boxes.filter((box) => box.id !== id));
  };
  const addBox = (newBox) => {
    setBoxes([...boxes, newBox]);
  };

  return (
    <div>
      {boxes.map((box) => (
        <Box
          key={box.id}
          id={box.id}
          width={box.width}
          height={box.height}
          handleRemove={removeBox}
          backgroundColor={box.backgroundColor}
        />
      ))}
      <NewBoxForm addBox={addBox}/>
    </div>
  );
};
export default BoxList
