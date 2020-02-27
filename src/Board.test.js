import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

it("renders without crashing", function () {
  render(<Board />);
});

it("matches snapshot - new board", function () {
  const { asFragment } = render(<Board chanceLightStartsOn={1}/>);
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot - winning", function () {
  const { asFragment } = render(<Board chanceLightStartsOn={0}/>);
  expect(asFragment()).toMatchSnapshot();
});

it("creates starter board", function () {
  const { queryByTestId } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={1} />);
  const middleCell = queryByTestId('1-1');
  expect(middleCell).toBeInTheDocument();

  fireEvent.click(middleCell);

  expect(queryByTestId('0-0')).toHaveClass('Cell-lit');
  expect(queryByTestId('0-1')).not.toHaveClass('Cell-lit');
  expect(queryByTestId('0-2')).toHaveClass('Cell-lit');
  expect(queryByTestId('1-0')).not.toHaveClass('Cell-lit');
  expect(queryByTestId('1-1')).not.toHaveClass('Cell-lit');
  expect(queryByTestId('1-2')).not.toHaveClass('Cell-lit');
  expect(queryByTestId('2-0')).toHaveClass('Cell-lit');
  expect(queryByTestId('2-1')).not.toHaveClass('Cell-lit');
  expect(queryByTestId('2-2')).toHaveClass('Cell-lit');
});

it("should flash you win message", function () {
  const { getByText } = render(<Board chanceLightStartsOn={0} />);
  
  expect(getByText('You Won!')).toBeInTheDocument();
});