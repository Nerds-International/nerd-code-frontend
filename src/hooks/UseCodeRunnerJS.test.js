import { useState, useEffect } from 'react';
import useCodeRunnerJS from './useCodeRunnerJS';
import {render} from "@testing-library/react";

describe('useCodeRunnerJS', () => {
    it('should handle runtime errors gracefully', () => {
        let result = null;
        let error = null;

        const TestComponent = () => {
            const { result: res, error: err } = useCodeRunnerJS('err');
            result = res;
            error = err;
            return null;
        };

        const { unmount } = render(<TestComponent />);

        expect(result).toBeNull();
        expect(error).toBe('err is not defined');

        unmount();
    });
});
