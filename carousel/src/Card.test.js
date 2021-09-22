import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

it("smoke test", function() {
    render(<Card />);
  });
  
  it("tests snapshots", ()=>{
    const {asFragment}=render(<Card />);
    expect(asFragment()).toMatchSnapshot();
  
  })
  
  
