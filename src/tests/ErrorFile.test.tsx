import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ErrorFile from "@/components/ErrorFile";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const LandingPageMock = () => <h1>Get Started</h1>;

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

  it("navigates to home page on button click", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/unknown"]}>
          <Routes>
            <Route path="*" element={<ErrorFile />} />
            <Route path="/home" element={<LandingPageMock />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Go to Home/i }));

    expect(await screen.findByText(/Get Started/i)).toBeInTheDocument();
  });
});
