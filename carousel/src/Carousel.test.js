import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  
  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  fireEvent.click(rightArrow);
  fireEvent.click(leftArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});



it("smoke test", function() {
  render(<Carousel />);
});

it("tests snapshots", ()=>{
  const {asFragment}=render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();

})

it("hides and shows arrows appropriately", function() {
  const { getByTestId } = render(<Carousel />);
  const leftButton = getByTestId("left-arrow");
  const rightButton = getByTestId("right-arrow");

  expect(leftButton).toHaveClass("hidden");
  expect(rightButton).not.toHaveClass("hidden");

fireEvent.click(rightButton);
 fireEvent.click(rightButton);
 expect(leftButton).not.toHaveClass("hidden");
 expect(rightButton).toHaveClass("hidden");

});




