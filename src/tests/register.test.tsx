import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Signup from "../components/Signup";
import UserHook from "../hooks/userHook";

vi.mock("../hooks/userHook");

describe("Signup Component", () => {
//   it("renders the signup form with labels", () => {
//     (UserHook as unknown as vi.Mock).mockImplementation(() => ({
//       useRegister: () => ({
//         user: null,
//         registerUser: vi.fn(),
//         isRegisteringUser: false,
//       }),
//     }));

//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <Signup />
//         </MemoryRouter>
//       </Provider>
//     );

//     expect(screen.getByLabelText(/user name/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /signup/i })).toBeInTheDocument();
//   });

  it("calls registerUser on form submission", async () => {
    const mockRegisterUser = vi.fn().mockResolvedValueOnce({});

    (UserHook as unknown as vi.Mock).mockImplementation(() => ({
      useRegister: () => ({
        user: null,
        registerUser: mockRegisterUser,
        isRegisteringUser: false,
      }),
    }));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/user name/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /signup/i }));

    await waitFor(() => {
      expect(mockRegisterUser).toHaveBeenCalledWith(
        "testuser",
        "test@example.com",
        "password123"
      );
    });
  });

  it("shows validation errors if fields are empty", async () => {
    (UserHook as unknown as vi.Mock).mockImplementation(() => ({
      useRegister: () => ({
        user: null,
        registerUser: vi.fn(),
        isRegisteringUser: false,
      }),
    }));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /signup/i }));

    await waitFor(() => {
      expect(screen.getByText(/username is a required field/i)).toBeInTheDocument();
      expect(screen.getByText(/email is a required field/i)).toBeInTheDocument();
      expect(screen.getByText(/password is a required field/i)).toBeInTheDocument();
    });
  });
  it("shows registering text when logging in", async () => {
    const mockRegisterUser = vi.fn().mockResolvedValueOnce({});

    (UserHook as vi.Mock).mockImplementation(() => ({
        useRegister: () => ({
            user: null,
            registerUser: mockRegisterUser,
            isRegisteringUser: true,
          }),
    }));

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    expect(screen.getByText(/registering.../i)).toBeInTheDocument();
  });
});
