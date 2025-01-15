import { renderHook, act } from "@testing-library/react";
import useCodeRunnerJS from './useCodeRunnerJS.js';

describe('useCodeRunnerJS', () => {
    test('should return the result of valid code execution', () => {
        const { result } = renderHook(() => useCodeRunnerJS('2 + 2'));
        expect(result.current.result).toBe(4);
        expect(result.current.error).toBe('');
    });

    test('should return an error for invalid code', () => {
        const { result } = renderHook(() => useCodeRunnerJS('invalidCode!'));
        expect(result.current.result).toBe(null);
        expect(result.current.error).toBeTruthy();
    });

    test('should return null result and error when code is empty', () => {
        const { result } = renderHook(() => useCodeRunnerJS(''));
        expect(result.current.result).toBe(null);
        expect(result.current.error).toBe(null);
    });

    test('should update the result when the code changes', () => {
        const { result, rerender } = renderHook(({ code }) => useCodeRunnerJS(code), {
            initialProps: { code: '5 + 5' },
        });
        expect(result.current.result).toBe(10);

        rerender({ code: '10 * 2' });
        expect(result.current.result).toBe(20);
    });

    test('should handle code with side effects', () => {
        const { result } = renderHook(() =>
            useCodeRunnerJS('(() => { const a = 5; return a * 2; })()')
        );
        expect(result.current.result).toBe(10);
        expect(result.current.error).toBe('');
    });
});
