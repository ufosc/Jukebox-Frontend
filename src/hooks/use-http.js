/**
 * Custom hook to handle http requests.
 */
import { useState, useCallback } from "react";
import axios from "axios";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    console.log('config ', requestConfig.body)
    try {
      let body = requestConfig.body ? requestConfig.body : null;
      
      const response = await axios({
        method: requestConfig.method ? requestConfig.method : "GET",
        url: requestConfig.url,
        headers: requestConfig.headers ? requestConfig.headers : {},
        data: body,
      }).then((res) => {
        console.log(res);
        return res;
      }).catch((err) => {
        console.log(err);
        return err;
      });

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      applyData(response.data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;