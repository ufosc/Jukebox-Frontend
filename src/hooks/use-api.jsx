/**
 * Custom hook to fetch data from API.
 */
import { useState, useCallback, useEffect } from "react";
import useHttp from "./use-http";
import { useCookies } from "react-cookie";

const API_BASE = "http://localhost:8000";

const useApi = () => {
  const [online, setOnline] = useState(false);
  const { isLoading, error, sendRequest } = useHttp();
  const [, setCookie] = useCookies(["token"]);

  const checkOnline = useCallback(async () => {
    try {
      await sendRequest(
        {
          url: API_BASE,
        },
        (res) => {
          if (!res) throw new Error("No response from server.");
          if (error) throw new Error(error);

          setOnline(true);
        }
      ).catch((err) => {
        setOnline(false);
        throw new Error(err);
      });
      if (error) throw new Error(error);

      // setOnline(true);
    } catch (err) {
      setOnline(false);
      console.log("err from api catch: ", err);
    }
  }, [error, sendRequest]);

  useEffect(() => {
    checkOnline();

    // const interval = setInterval(checkOnline, DELAY);

    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  const login = useCallback(
    async (username, password) => {
      
      try {
        await sendRequest(
          {
            url: `${API_BASE}/api/user/login`,
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              username: username,
              password: password,
            },
          },
          (res) => {
            console.log('api response: ',res);
            if (!res) throw new Error("No response from server.");
            // console.log('api response error: ', error)
            
            setCookie("token", res.data.token, { path: "/" });
            
            return res;
          }
        ).catch((err) => {
          // error = true;
          console.log('error from api: ', err);
          throw new Error(err);
          // return false;
        });
        return true;
        
        // if (responseData.status !== 200) throw new Error("Invalid credentials.");
      } catch (err) {
        console.log(err);
        // error = true;
        return false;
      }
      
      // if (error) return false;
      
      // return !error;
      
    },
    [sendRequest, setCookie]
  );

  const register = useCallback(
    async (username, password) => {
      try {
        const responseData = await sendRequest({
          url: `${API_BASE}/api/user/register`,
          method: "POST",
          body: {
            username,
            password,
          },
        });
        console.log(responseData);
      } catch (err) {
        console.log(err);
      }
    },
    [sendRequest]
  );

  return {
    isLoading,
    error,
    online,
    login,
    register,
  };
};

export default useApi;
