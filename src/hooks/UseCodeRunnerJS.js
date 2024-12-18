import { useState, useEffect } from 'react';

function useCodeRunnerJS(code) {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (code) {
            try {
                const result = eval(code);
                setResult(result);
                setError("")
            } catch (err) {
                setError(err.message);
            }
        }
    }, [code]);

    return { result, error };
}

export default useCodeRunnerJS;

