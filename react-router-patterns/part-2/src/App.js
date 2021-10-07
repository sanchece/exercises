import React, {useState} from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ColorList from "./ColorList";
import AddColorForm from "./AddColorForm";
import Color from "./Color";
function App() {
  const startColors = [
    {
      name: "red",
      code: "#F42E03",
    },
    {
      name: "green",
      code: "#12E200",
    },
    {
      name: "yellow",
      code: "#FFFF00  "
    },
  ];
  const [colors, setColors] = useState(startColors);

  const addColor=(newColorObj)=>{
    setColors([...colors,newColorObj])
  }

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/colors">
            <ColorList colors={colors} />
          </Route>
          <Route exact path="/colors/new">
            <AddColorForm addColor={addColor} />
          </Route>
          <Route path="/colors/:color">
            <Color colors={colors}></Color>
          </Route>

          <Redirect to="/colors"></Redirect>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
