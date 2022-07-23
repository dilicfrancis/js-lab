import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("Async Tests", () => {
  test("Request succeeds: Renders post", async () => {
    // Arrange
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: "p1", title: "first post" }],
    });
    render(<Async />);

    //Act
    //.. do nothing

    //Assert
    const listElement = await screen.findAllByRole("listitem");
    expect(listElement).not.toHaveLength(0);
  });
});
