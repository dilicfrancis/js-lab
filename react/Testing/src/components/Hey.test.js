import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Hey from "./Hey";

describe("Home Screen Checks", () => {
  test("renders 'Hey' as a text", () => {
    // arrange
    render(<Hey />);

    //act
    //...nothing

    //assert
    const heyElement = screen.getByText("Hey", { exact: false });

    expect(heyElement).toBeInTheDocument();
  });

  test("render 'How are you?' text when clicked", () => {
    //arrange
    render(<Hey />);

    //act
    const headElement = screen.getByRole("heading");
    userEvent.click(headElement);

    //assert
    const heyElement = screen.getByText("How are you", { exact: false });

    expect(heyElement).toBeInTheDocument();
  });

  test("'Hey' text is no longer visible when clicked", () => {
    //arrange
    render(<Hey />);

    //act
    const headElement = screen.getByRole("heading");
    userEvent.click(headElement);

    //assert
    const heyElement = screen.queryByText("Hey", { exact: false });

    expect(heyElement).toBeNull();
  });
});
