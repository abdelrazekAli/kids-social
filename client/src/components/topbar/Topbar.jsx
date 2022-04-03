import "./topbar.css";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div>
        <Link to="/">
          <span className="logo">Family Social</span>
        </Link>
      </div>
    </div>
  );
}
