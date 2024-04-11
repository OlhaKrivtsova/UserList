import {useState, useCallback} from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendHttpRequest = useCallback(async (httpOptions, managedData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(httpOptions.url, {
        method: httpOptions.method ? httpOptions.method : 'GET',
        body: httpOptions.body ? JSON.stringify(httpOptions.body) : null,
        headers: httpOptions.headers ? httpOptions.headers : {},
      });

      if (!response.ok) {
        throw new Error(`Помилка запиту: статус ${response.status}`);
      }

      const data = await response.json();
      managedData(data);
    } catch (err) {
      setError(err.message || 'Щось трапилось ');
    } finally {
      setIsLoading(false);
    }
  }, []);
  return {isLoading, error, sendHttpRequest};
};

export default useHttp;
