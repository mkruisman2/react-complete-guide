import { render, screen } from "@testing-library/react";

import Async from "./Async";

describe("Async test suite", () => {
  test("renders post if request succeeds", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: "p1", title: "First post" }],
    });
    render(<Async />);

    const listItemElements = await screen.findAllByRole("listitem", {}, 3000);
    expect(listItemElements).not.toHaveLength(0);
  });
});
