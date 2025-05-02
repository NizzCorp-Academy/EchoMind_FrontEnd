import { LandingPage } from "../pages/LandingPage";
import { store } from "../redux/store";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route,Routes } from "react-router";
import { describe, expect, it } from "vitest";

const MockSignup = () =><h1>Signup</h1>;

describe("LandingPage Component", () => {
    it("renders 'Get Started' button", async () => {
        render(
          <Provider store={store}>
            <MemoryRouter>
              <LandingPage />
            </MemoryRouter>
          </Provider>
        );
      
        const button = await screen.findByTestId("get-start");
        expect(button).toBeInTheDocument();
        expect(await screen.findByTestId("home")).toBeInTheDocument();
        expect(await screen.findByTestId("features")).toBeInTheDocument();
        expect(await screen.findByTestId("about")).toBeInTheDocument();
        expect(await screen.findByTestId("footer")).toBeInTheDocument();
      });
      it("should navigate when click getstart", async () => {
        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={["/home"]}>
              <Routes>
                <Route path="/home" element={<LandingPage />} />
                <Route path="/register" element={<MockSignup />} />
              </Routes>
            </MemoryRouter>
          </Provider>
        );

        const button = await screen.findByTestId("get-start");
        fireEvent.click(button);
        expect(await screen.findByText(/Signup/i)).toBeInTheDocument();
      });
});
