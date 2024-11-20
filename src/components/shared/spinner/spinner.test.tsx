import { render } from "@testing-library/react";
import "@testing-library/jest-dom"; // for extended matchers
import Spinner from "./spinner";

describe("Spinner Component", () => {
  it("renders the spinner div with the correct class", () => {
    const { container } = render(<Spinner />);
    const spinnerElement = container.querySelector(".spinner");
    expect(spinnerElement).toBeInTheDocument();
  });
});
