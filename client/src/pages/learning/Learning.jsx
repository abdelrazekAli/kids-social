import "./learning.css";
import { Link } from "react-router-dom";

// Import components
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Learning() {
  return (
    <>
      <Topbar />
      <div className="learnContainer">
        <Sidebar />
        <div className="learning-cards">
          <p className="learnHeader">Reading Is Dreaming With Open Eyes</p>
          <div className="card-grid">
            <Link className="card" to="/learning/history">
              <div
                className="card__background"
                style={{
                  backgroundImage:
                    "url('/assets/images/categories/history.jpg')",
                }}
              ></div>
              <div className="card__content">
                <p className="card__category">Category</p>
                <h3 className="card__heading">History</h3>
              </div>
            </Link>
            <Link className="card" to="/learning/science">
              <div
                className="card__background"
                style={{
                  backgroundImage:
                    "url('/assets/images/categories/science.jpg')",
                }}
              ></div>
              <div className="card__content">
                <p className="card__category">Category</p>
                <h3 className="card__heading">Science</h3>
              </div>
            </Link>
            <Link className="card" to="/learning/space">
              <div
                className="card__background"
                style={{
                  backgroundImage: "url('/assets/images/categories/space.jpg')",
                }}
              ></div>
              <div className="card__content">
                <p className="card__category">Category</p>
                <h3 className="card__heading">Space</h3>
              </div>
            </Link>
            <Link className="card" to="/learning/programming">
              <div
                className="card__background"
                style={{
                  backgroundImage:
                    "url('/assets/images/categories/programming.jpg')",
                }}
              ></div>
              <div className="card__content">
                <p className="card__category">Category</p>
                <h3 className="card__heading">Programming</h3>
              </div>
            </Link>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
