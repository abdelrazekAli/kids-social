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
        <div class="learning-cards">
          <p className="learnHeader">Reading Is Dreaming With Open Eyes</p>
          <div class="card-grid">
            <Link class="card" to="/learning/history">
              <div
                class="card__background"
                style={{
                  backgroundImage:
                    "url('/assets/images/categories/history.jpg')",
                }}
              ></div>
              <div class="card__content">
                <p class="card__category">Category</p>
                <h3 class="card__heading">History</h3>
              </div>
            </Link>
            <Link class="card" to="/learning/science">
              <div
                class="card__background"
                style={{
                  backgroundImage:
                    "url('/assets/images/categories/science.jpg')",
                }}
              ></div>
              <div class="card__content">
                <p class="card__category">Category</p>
                <h3 class="card__heading">Science</h3>
              </div>
            </Link>
            <Link class="card" to="/learning/space">
              <div
                class="card__background"
                style={{
                  backgroundImage: "url('/assets/images/categories/space.jpg')",
                }}
              ></div>
              <div class="card__content">
                <p class="card__category">Category</p>
                <h3 class="card__heading">Space</h3>
              </div>
            </Link>
            <Link class="card" to="/learning/images/programming">
              <div
                class="card__background"
                style={{
                  backgroundImage:
                    "url('/assets/images/categories/programming.jpg')",
                }}
              ></div>
              <div class="card__content">
                <p class="card__category">Category</p>
                <h3 class="card__heading">Programming</h3>
              </div>
            </Link>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
