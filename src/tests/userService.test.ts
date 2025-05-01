import { describe, it, expect, beforeEach, vi } from "vitest";
import UserService from "../services/userService";
import AxiosClass from "../utils/axios";
import Cookies from "js-cookie";

vi.mock("../utils/axios");

describe("UserService", () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe("register", () => {
    it("should make a POST request to /auth/register", async () => {
      const mockSet = vi.spyOn(Cookies, "set");
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
        token: "mockjwt",
      };

      vi.mocked(AxiosClass.post).mockResolvedValue(mockResponse);

      const response = await userService.register(mockData);
      Cookies.set("jwt", "mockjwt", { expires: 15 });
      expect(AxiosClass.post).toHaveBeenCalledWith("/auth/register", mockData);
      expect(response.data?.username).toBe("test");
      expect(response.data?.email).toBe("test@gmail.com");
      expect(mockSet).toHaveBeenCalledWith("jwt", "mockjwt", { expires: 15 });
    });
    it("should make a error message on register", async () => {
      const mockData = {
        username: "dvfrv",
        email: "test@gmail.com",
        password: "",
      };
      const mockResponse = {
        status: "error",
        message: "Register Failed",
      };

      vi.mocked(AxiosClass.post).mockResolvedValue(mockResponse);

      expect(async () => {
        await userService.register(mockData);
      }).rejects.toThrow("Register Failed");
    });
  });

  describe("login", () => {
    it("should make a POST request to /auth/login", async () => {
      const mockSet = vi.spyOn(Cookies, "set");
      const mockData = { email: "test@gmail.com", password: "test123" };
      const mockResponse = {
        status: "success",
        user: {
          username: "test",
          email: "test@gmail.com",
        },
        token: "mockjwt",
      };

      vi.mocked(AxiosClass.post).mockResolvedValue(mockResponse);

      const response = await userService.login(mockData);

      expect(AxiosClass.post).toHaveBeenCalledWith("/auth/login", mockData);
      expect(response.data?.email).toBe("test@gmail.com");
      expect(mockSet).toHaveBeenCalledWith("jwt", "mockjwt", { expires: 15 });
    });
    it("should make a error message on login", async () => {
      const mockData = { email: "test@gmail.com", password: "" };
      const mockResponse = {
        status: "error",
        message: "enter password",
      };

      vi.mocked(AxiosClass.post).mockResolvedValue(mockResponse);

      expect(async () => {
        await userService.login(mockData);
      }).rejects.toThrow("enter password");
    });
  });

  describe("getUser", () => {
    it("should make a GET request to /auth/me", async () => {
      const mockResponse = {
        status: "success",
        user: {
          username: "test",
          email: "test@gmail.com",
        },
        token: "mockToken",
      };

      vi.mocked(AxiosClass.get).mockResolvedValue(mockResponse);

      const response = await userService.getUser();

      expect(AxiosClass.get).toHaveBeenCalledWith("/user/me");
      expect(response.data?.username).toBe("test");
    });
    it("should make a error message on getUser", async () => {
      const mockResponse = {
        status: "error",
        message: "Fetching Failed",
      };

      vi.mocked(AxiosClass.get).mockResolvedValue(mockResponse);

      expect(async () => {
        await userService.getUser();
      }).rejects.toThrow("Fetching Failed");
    });
  });
  describe("logOut", () => {
    it("should remove token from cookies", () => {
      Cookies.set("jwt", "mockjwt", { expires: 15 });

      const userService = new UserService();
      userService.logOut();
      expect(Cookies.get("jwt")).toBeUndefined();
    });
  });
});
