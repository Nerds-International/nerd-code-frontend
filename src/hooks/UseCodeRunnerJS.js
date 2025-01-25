import { useState, useEffect } from "react";

const useCodeRunnerJS = (code) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (code) {
      const workerCode = `
        (function(global) {
          if (!String.prototype.replaceAll) {
            String.prototype.replaceAll = function(search, replacement) {
              return this.split(search).join(replacement);
            };
          }
        })(self);

        self.addEventListener('message', (event) => {
          try {
            const result = eval(event.data);
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

      worker.postMessage(code);

      return () => {
        worker.terminate();
      };
    }
  }, [code]);

  return { result, error };
};

export default useCodeRunnerJS;
