import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./SearchBar/index.js";

describe("Search", () => {
  // eslint-disable-next-line space-before-function-paren
  test("calls the onChange callback handler based on the length of the input value", async () => {
    const onChange = jest.fn();
    const inputValue = "value";

    render(<Search setSearchValue={onChange} />);

    await userEvent.type(screen.getByRole("searchbox"), inputValue);

    expect(onChange).toHaveBeenCalledTimes(inputValue.length);
  });
});
