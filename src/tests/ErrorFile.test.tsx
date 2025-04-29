import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ErrorFile from "@/components/ErrorFile";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { LandingPage } from "@/pages/LandingPage";

describe("ErrorFile Component", () => {
  it("renders 404 message and button", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ErrorFile />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByRole("heading", { name: /404 - Page Not Found/i })
    ).toBeInTheDocument();
  });

  it("navigates to home page on button click", () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <Routes>
          <Route path="*" element={<ErrorFile />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /go to home/i }));

    expect(screen.getByText(/ Get Started/i)).toBeInTheDocument();
  });
});
