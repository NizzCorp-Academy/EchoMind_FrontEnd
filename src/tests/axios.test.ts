import { describe, expect, it, vi, Mock } from "vitest";
import axios from "axios";

vi.mock("axios");

describe("AxiosClass", () => {
  it("should call axios.get and return fetched value", async () => {
    const mockGet = vi
      .fn()
      .mockResolvedValue({ data: { id: "123", name: "John" } });
    (axios.create as unknown as Mock).mockReturnValue({
      get: mockGet,
    });
    vi.resetModules();
    const { default: AxiosClass } = await import("../utils/axios");

    const result = await AxiosClass.get("/user/123");

    expect(mockGet).toHaveBeenCalledWith("/user/123");
    expect(result).toEqual({ id: "123", name: "John" });
  });
  it("should call Axios.post and return created value", async () => {
    const mockPost = vi.fn().mockResolvedValue({
      data: {
        id: "123",
        name: "name",
        email: "test@mail.com",
      },
    });

    (axios.create as unknown as Mock).mockReturnValue({
      post: mockPost,
    });

    vi.resetModules();
    const { default: AxiosClass } = await import("../utils/axios");

    const data = { name: "name", email: "test@mail.com" };
    const result = await AxiosClass.post("/login", data);

    expect(mockPost).toHaveBeenCalledWith("/login", data);
    expect(result).toEqual({ id: "123", name: "name", email: "test@mail.com" });
  });
  it("should call Axios.put and return updated value", async () => {
    const mockUpdate = vi.fn().mockResolvedValue({
      data: { id: "123", name: "new name", email: "test@mail.com" },
    });
    (axios.create as unknown as Mock).mockReturnValue({
      put: mockUpdate,
    });

    vi.resetModules();
    const { default: AxiosClass } = await import("../utils/axios");

    const data = { name: "new name" };
    const result = await AxiosClass.put("/update/123", data);

    expect(mockUpdate).toHaveBeenCalledWith("/update/123", data);
    expect(result).toEqual({
      id: "123",
      name: "new name",
      email: "test@mail.com",
    });
  });
  it("should callAxios.delete and return deleted data", async () => {
    const mockDelete: Mock = vi.fn().mockResolvedValue({
      data: { id: "123", name: "new name", email: "test@mail.com" },
    });
    (axios.create as unknown as Mock).mockReturnValue({
      delete: mockDelete,
    });
    vi.resetModules();
    const { default: AxiosClass } = await import("../utils/axios");
    const result = await AxiosClass.delete("/delete/123");

    expect(mockDelete).toHaveBeenCalledWith("/delete/123");
    expect(result).toEqual({
      id: "123",
      name: "new name",
      email: "test@mail.com",
    });
  });
});
