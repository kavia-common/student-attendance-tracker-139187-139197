import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app brand", () => {
  render(<App />);
  const title = screen.getByText(/Attendance Tracker/i);
  expect(title).toBeInTheDocument();
});
