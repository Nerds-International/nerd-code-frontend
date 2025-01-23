import { useState, useEffect } from "react";

const useCodeRunnerJS = (code) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (code) {
      const workerCode = `
        self.addEventListener('message', (event) => {
          try {
            const result = ${code};
            self.postMessage(result);
          } catch (error) {
            self.postMessage({ error: error.message });
          }
        });
      `;

      const blob = new Blob([workerCode], { type: "application/javascript" });
      const worker = new Worker(URL.createObjectURL(blob));

      worker.onmessage = (event) => {
        if (event.data.error) {
          setError(event.data.error);
        } else {
          setResult(event.data);
        }
        worker.terminate();
      };

      worker.postMessage("execute");

      return () => {
        worker.terminate();
      };
    }
  }, [code]);

  return { result, error };
};

export default useCodeRunnerJS;
