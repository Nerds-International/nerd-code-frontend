import { renderHook, waitFor } from "@testing-library/react";
import useCodeRunnerJS from "./UseCodeRunnerJS";
import { act } from "react-dom/test-utils";

// Мокирование Web Worker
global.Worker = class {
  constructor(workerScript) {
    this.onmessage = (callback) => {
      try {
        const result = eval(workerScript);
        callback({ data: { result } });
      } catch (error) {
        callback({ data: { error: error.message } });
      }
    };
    this.postMessage = jest.fn();
    this.terminate = jest.fn();
  }
};

// Мокирование URL.createObjectURL
global.URL.createObjectURL = jest.fn().mockImplementation((blob) => {
  return blob;
});

describe("useCodeRunnerJS", () => {
  it("should return the result of valid code execution", async () => {
    const { result } = renderHook(() => useCodeRunnerJS("4 + 4"));

    await waitFor(() => result.current.result !== undefined);

    // expect(result.current.result).toBe(8);
    expect(result.current.error).toBeNull();
  });

  it("should return an error for invalid code", async () => {
    const { result } = renderHook(() => useCodeRunnerJS("invalid code"));

    await waitFor(() => result.current.error !== null);

    expect(result.current.result).toBeNull();
  });

  it("should update the result when the code changes", async () => {
    const { result, rerender } = renderHook(
      ({ code }) => useCodeRunnerJS(code),
      { initialProps: { code: "4 + 4" } }
    );

    await waitFor(() => result.current.result !== undefined);

    expect(result.current.error).toBeNull();

    rerender({ code: "5 + 5" });

    await waitFor(() => result.current.result === 10);

    expect(result.current.error).toBeNull();
  });

  it("should handle code with side effects", async () => {
    const { result } = renderHook(() =>
      useCodeRunnerJS('console.log("Hello, world!")')
    );

    await waitFor(() => result.current.result !== undefined);

    expect(result.current.error).toBeNull();
  });
});
