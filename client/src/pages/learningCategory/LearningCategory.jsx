import "./learningCategory.css";

import { useParams } from "react-router-dom";
import { LearningPosts } from "../../dummyData";

// Import components
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ReadOnlyPost from "../../components/readOnlyPost/ReadOnlyPost";

export default function LearningCategory() {
  let { category } = useParams();

  return (
    <>
      <Topbar />
      <div className="learnContainer">
        <Sidebar />
        <div className="feed">
          <p className="learnHeader text-cap">{category}</p>
          <div className="">
            {LearningPosts.map(
              (post) =>
                post.category === category && (
                  <ReadOnlyPost key={post.id} post={post} />
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
