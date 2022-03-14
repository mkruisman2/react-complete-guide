import Greeting from "./Greeting";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Greeting Component", () => {
  test("Renders Hello World as a text", () => {
    render(<Greeting />);
    const helloWorldElement = screen.getByText("Hello World", { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });
  test("Renders 'good to see you' paragraph before clicking change button", () => {
    render(<Greeting />);
    const paragraphElement = screen.getByText("good to see you", {
      exact: false,
    });
    expect(paragraphElement).toBeInTheDocument();
  });
  test("Renders 'Text changed' after clicking the button", () => {
    render(<Greeting />);

    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);
    const paragraphElement = screen.getByText("Text changed", { exact: true });
    expect(paragraphElement).toBeInTheDocument();
  });
  test("does not render 'good to see you' paragraph after clicking change button", () => {
    render(<Greeting />);

    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    const paragraphElement = screen.queryByText("good to see you", {
      exact: false,
    });
    expect(paragraphElement).toBeNull();
  });
});
