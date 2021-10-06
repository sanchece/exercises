import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import VendingMachine from "./VendingMachine";
import Chips from "./Chips";
import Cookies from "./Cookies";
import Scantrons from "./Scantrons";
function App() {
  return (
    <BrowserRouter>
    <Route exact path="/">
      <VendingMachine />
    </Route>
    <Route exact path="/chips">
      <Chips />
    </Route>
    <Route exact path="/cookies">
      <Cookies />
    </Route>
    <Route exact path="/scantrons">
      <Scantrons />
    </Route>

    </BrowserRouter>
  );
}

export default App;
