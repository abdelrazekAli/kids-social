import "./register.css";
import { Link } from "react-router-dom";

export default function Register() {
  document.body.style.backgroundColor = "#0080ff";
  const handleForm = (e) => {
    e.preventDefault();
    window.location.replace("/login");
  };
  return (
    <div className="login-container">
      <div className="login-icon">Family Social</div>
      <div className="login-form">
        <div className="login-title">Sign Up</div>
        <form onSubmit={handleForm}>
          <input className="login-input" placeholder="Full Name" type="text" />
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
            className="login-input"
            placeholder="Confirm Password"
            type="password"
          />
          <input className="login-input button" type="submit" value="Sign Up" />
        </form>
      </div>
      <div className="login-signup">
        Have an account? <Link to={"/login"}>Log in</Link>
      </div>
    </div>
  );
}
