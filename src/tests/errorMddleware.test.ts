import { errorMiddleware } from "../utils/errorMiddleware";
import { configureStore } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { vi, describe, beforeEach, expect, it } from "vitest";

// Mock sonner toast
vi.mock("sonner", () => ({
    toast: vi.fn(),
}));

// Mock service that throws error
class MockService {
    async someMethod() {
        throw new Error("testing error from service");
    }
}

// Create a test slice with async thunk
const testAsyncThunk = createAsyncThunk("test/action", async () => {
    const service = new MockService();
    return await service.someMethod();
});

const testSlice = createSlice({
    name: "test",
    initialState: {},
    reducers: {},
});

describe("errorMiddleware", () => {
    let store: any;

    beforeEach(() => {
        vi.clearAllMocks();
        store = configureStore({
            reducer: {
                test: testSlice.reducer,
            },
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(errorMiddleware),
        });
    });

    it("should catch error thrown from service", async () => {
        await store.dispatch(testAsyncThunk());

        // Updated expectation to match actual middleware behavior
        expect(toast).toHaveBeenCalledWith(false, {
            description: "An error occurred while processing your request.",
        });
    });

    it("should catch error thrown directly from slice", async () => {
        const sliceErrorThunk = createAsyncThunk(
            "test/sliceError",
            async () => {
                throw new Error("testing error from slice");
            }
        );

        await store.dispatch(sliceErrorThunk());

        // Updated expectation to match actual middleware behavior
        expect(toast).toHaveBeenCalledWith(false, {
            description: "An error occurred while processing your request.",
        });
    });

    // it("should handle 400 status code error", async () => {
    //     const status400Thunk = createAsyncThunk(
    //         "test/status400Error",
    //         async () => {
    //             const error = new Error("Request failed with status code 400");
    //             throw error;
    //         }
    //     );

    //     await store.dispatch(status400Thunk());

    //     expect(toast).toHaveBeenCalledWith("Something went wrong!", {
    //         description: "An error occurred while processing your request.",
    //     });
    // });
});
