import "./register.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import Error from "../../components/error/Error";
import { CircularProgress } from "@material-ui/core";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const [isLoading, setisLoading] = useState(false);

  const [error, setError] = useState({
    isError: false,
    msg: "",
  });
  const handleForm = async (e) => {
    e.preventDefault();
    console.log("hi", password.current.value, confirmPassword.current.value);
    if (password.current.value !== confirmPassword.current.value) {
      return setError({ isError: true, msg: "Passwords are not the same" });
    }
    setisLoading(true);
    setError({ isError: false, msg: "" });

    try {
      let res = await axios.post("/api/v1/auth/register", {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      });
      if (res.data) {
        window.location.replace("/login");
        setisLoading(false);
      }
    } catch (err) {
      setisLoading(false);
      if (err.response.status === 409) {
        setError({ isError: true, msg: "Email is already used" });
      } else {
        setError({ isError: true, msg: "Somthing went wrong!" });
      }
    }
  };

  document.body.style.backgroundColor = "#0080ff";

  return (
    <div className="login-container">
      <div className="login-icon">Kids Social</div>
      <div className="login-form">
        <div className="login-title">Sign Up</div>
        <form onSubmit={handleForm}>
          <input
            className="login-input"
            placeholder="Name"
            type="text"
            required
            ref={username}
          />
          <input
            className="login-input"
            placeholder="Email"
            type="email"
            required
            ref={email}
          />
          <input
            className="login-input"
            placeholder="Password"
            type="password"
            required
            ref={password}
          />
          <input
            className="login-input"
            placeholder="Confirm Password"
            type="password"
            required
            ref={confirmPassword}
          />
          <button
            className="login-input button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress color="#fff" size="20px" />
            ) : (
              "Sign Up"
            )}
          </button>
          {error.isError && <Error msg={error.msg} />}
        </form>
      </div>
      <div className="login-signup">
        Have an account? <Link to={"/login"}>Log in</Link>
      </div>
    </div>
  );
}
