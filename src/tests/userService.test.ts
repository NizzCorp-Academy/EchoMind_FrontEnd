import { describe, it, expect, beforeEach, vi } from "vitest";
import UserService from "../services/userService";

// Mock the AxiosClass
vi.mock("./mockfile", () => ({
  AxiosClass: vi.fn().mockImplementation(() => ({
    post: vi.fn(),
    get: vi.fn(),
  })),
}));

describe("UserService", () => {
  let userService: UserService;
  let mockAxios: any;

  beforeEach(() => {
    userService = new UserService();
    mockAxios = userService.axios;
  });

  describe("register", () => {
    it("should make a POST request to /auth/register", async () => {
      const mockData = { username: "test", password: "test123" };
      const mockResponse = { data: { success: true } };

      vi.mocked(mockAxios.post).mockResolvedValue(mockResponse);

      const response = await userService.register(mockData);

      expect(mockAxios.post).toHaveBeenCalledWith("/auth/register", mockData);
      expect(response).toEqual(mockResponse);
    });
  });

  describe("login", () => {
    it("should make a POST request to /auth/login", async () => {
      const mockData = { username: "test", password: "test123" };
      const mockResponse = { data: { token: "fake-token" } };

      vi.mocked(mockAxios.post).mockResolvedValue(mockResponse);

      const response = await userService.login(mockData);

      expect(mockAxios.post).toHaveBeenCalledWith("/auth/login", mockData);
      expect(response).toEqual(mockResponse);
    });
  });

  describe("getUser", () => {
    it("should make a GET request to /auth/me", async () => {
      const mockResponse = { data: { id: 1, username: "test" } };

      vi.mocked(mockAxios.get).mockResolvedValue(mockResponse);

      const response = await userService.getUser();

      expect(mockAxios.get).toHaveBeenCalledWith("/auth/me");
      expect(response).toEqual(mockResponse);
    });
  });
});
