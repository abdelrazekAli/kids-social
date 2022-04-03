import { createContext, useReducer, useEffect } from "react";
import Reducer from "./Reducer";
import axios from "axios";
import jwt_decode from "jwt-decode";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
const { user } = INITIAL_STATE;

// Refresh token
const refreshToken = async () => {
  try {
    const res = await axios.post("/api/v1/auth/refresh-token", {
      token: user.refreshToken,
    });
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, accessToken: res.data.accessToken })
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const axiosJWT = axios.create();
if (user) {
  //This will run before every axios request to refresh token
  const decodedToken = jwt_decode(user.accessToken);
  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["auth-token"] = data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}
