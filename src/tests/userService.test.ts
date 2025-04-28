import { describe, it, expect, beforeEach, vi } from "vitest";
import UserService from "../services/userService";
import AxiosClass from "../utils/axios";

vi.mock("../utils/axios");

describe("UserService", () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe("register", () => {
    it("should make a POST request to /auth/register", async () => {
      const mockData = {
        username: "test",
        email: "test@gmail.com",
        password: "test123",
      };
      const mockResponse = {
        status: "success",
        user: {
          username: "test",
          email: "test@gmail.com",
        },
        token: "mockToken",
      };

      // Mock AxiosClass.post
      vi.mocked(AxiosClass.post).mockResolvedValue(mockResponse);

      // const response = await userService.register(mockData);

      expect(AxiosClass.post).toHaveBeenCalledWith("/auth/register", mockData);
      expect(response.data?.username).toBe("test");
      expect(response.data?.email).toBe("test@gmail.com");
    });
    it("should make a error message on register", async () => {
      const mockData = {username:"dvfrv", email: "test@gmail.com", password: "" };
      const mockResponse = {
        status: "error",
        message: "Register Failed",
      };

      vi.mocked(AxiosClass.post).mockResolvedValue(mockResponse);

      const response = await userService.register(mockData);

      expect(AxiosClass.post).toHaveBeenCalledWith("/auth/register", mockData);
      expect(response.error).toBe("Register Failed");
    });
  });

  describe("login", () => {
    it("should make a POST request to /auth/login", async () => {
      const mockData = { email: "test@gmail.com", password: "test123" };
      const mockResponse = {
        status: "success",
        user: {
          username: "test",
          email: "test@gmail.com",
        },
        token: "mockToken",
      };

      vi.mocked(AxiosClass.post).mockResolvedValue(mockResponse);

      // const response = await userService.login(mockData);

      expect(AxiosClass.post).toHaveBeenCalledWith("/auth/login", mockData);
      expect(response.data?.email).toBe("test@gmail.com");
    });
    it("should make a error message on login", async () => {
      const mockData = { email: "test@gmail.com", password: "" };
      const mockResponse = {
        status: "error",
        message: "enter password",
      };

      vi.mocked(AxiosClass.post).mockResolvedValue(mockResponse);

      const response = await userService.login(mockData);

      expect(AxiosClass.post).toHaveBeenCalledWith("/auth/login", mockData);
      expect(response.error).toBe("enter password");
    });
   
  });

  describe("getUser", () => {
    it("should make a GET request to /auth/me", async () => {
<<<<<<< HEAD
      // const mockResponse = { data: { id: 1, username: "test" } };

      // vi.mocked(mockAxios.get).mockResolvedValue(mockResponse);
=======
      const mockResponse = {
        status: "success",
        user: {
          username: "test",
          email: "test@gmail.com",
        },
        token: "mockToken",
      };

      vi.mocked(AxiosClass.get).mockResolvedValue(mockResponse);
>>>>>>> e27ea64317974d03537899ccab4200f0a56783bf

      // const response = await userService.getUser();

<<<<<<< HEAD
      // expect(mockAxios.get).toHaveBeenCalledWith("/auth/me");
      // expect(response).toEqual(mockResponse);
      expect("a").toEqual("a");
=======
      expect(AxiosClass.get).toHaveBeenCalledWith("/auth/me");
      expect(response.data?.username).toBe("test");
>>>>>>> e27ea64317974d03537899ccab4200f0a56783bf
    });
  });
  it("should make a error message on getUser", async () => {
    const mockResponse = {
      status: "error",
      message: "Fetching Failed",
    };

    vi.mocked(AxiosClass.get).mockResolvedValue(mockResponse);

    const response = await userService.getUser();

    expect(AxiosClass.get).toHaveBeenCalledWith("/auth/me");
    expect(response.error).toBe("Fetching Failed");
  });
});
