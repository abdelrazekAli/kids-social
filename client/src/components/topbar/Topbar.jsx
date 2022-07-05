import "./topbar.css";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div>
        <Link to="/">
          <span className="logo">
            {/* <span>K</span>
            <span>I</span>
            <span>D</span>
            <span>S</span> */}
            Kids Social
          </span>
        </Link>
      </div>
    </div>
  );
}
