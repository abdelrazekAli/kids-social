import "./login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import Error from "../../components/error/Error";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const [errorMsg, setErrorMsg] = useState("");
  const { isFetching, dispatch, error } = useContext(Context);
  const handleForm = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      let res = await axios.post("/api/v1/auth/login", {
        email: email.current.value,
        password: password.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      window.location.replace("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      if (err.response.status === 500) {
        setErrorMsg("Somthing went wrong!");
      } else {
        setErrorMsg("Invalid email or password");
      }
    }
  };

  document.body.style.backgroundColor = "#0080ff";

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-icon">Family Social</div>
        <div className="login-form">
          <div className="login-title">Log In</div>
          <form onSubmit={handleForm}>
            <input
              className="login-input"
              placeholder="Email Address"
              type="email"
              required
              ref={email}
            />
            <input
              className="login-input"
              placeholder="Password"
              type="password"
              minLength="6"
              required
              ref={password}
            />
            <button
              className="login-input button"
              type="submit"
              disabled={isFetching}
            >
              {isFetching ? (
                <CircularProgress color="#fff" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            {error && <Error msg={errorMsg} />}
          </form>
        </div>
        <div className="login-signup">
          Don't have an account?
          <Link to={"/register"}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
