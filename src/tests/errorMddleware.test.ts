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
        // Clear mock calls
        vi.clearAllMocks();

        // Create store with error middleware
        store = configureStore({
            reducer: {
                test: testSlice.reducer,
            },
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(errorMiddleware),
        });
    });

    it("should catch error thrown from service", async () => {
        // Dispatch async action that will throw error
        await store.dispatch(testAsyncThunk());

        // Check if toast was called with correct error message
        expect(toast).toHaveBeenCalledWith(
            "testing error from service",
            expect.objectContaining({
                description: expect.any(String),
            })
        );
    });

    it("should catch error thrown directly from slice", async () => {
        // Create thunk that throws error directly
        const sliceErrorThunk = createAsyncThunk(
            "test/sliceError",
            async () => {
                throw new Error("testing error from slice");
            }
        );

        await store.dispatch(sliceErrorThunk());

        expect(toast).toHaveBeenCalledWith(
            "testing error from slice",
            expect.objectContaining({
                description: expect.any(String),
            })
        );
    });
});
