import "./login.css";
import { Link } from "react-router-dom";

export default function Login() {
  document.body.style.backgroundColor = "#0080ff";
  const handleForm = (e) => {
    e.preventDefault();
    window.location.replace("/");
  };
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
            />
            <input
              className="login-input"
              placeholder="Password"
              type="password"
            />
            <input
              className="login-input button"
              type="submit"
              value="Log In"
            />
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
