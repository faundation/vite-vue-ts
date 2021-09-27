import { render, fireEvent, screen } from "@testing-library/vue";
import App from "@/App.vue";

describe("App", () => {
  beforeEach(() => {
    render(App);
  });

  test("increments value on click", async () => {
    const button = screen.getByText("count is: 0");

    // Dispatch a native click event to our button element.
    await fireEvent.click(button); // count is: 1
    await fireEvent.click(button); // count is: 2

    expect(button).toHaveTextContent("count is: 2");
  });
});
