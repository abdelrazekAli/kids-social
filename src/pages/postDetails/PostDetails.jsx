import "./postdetails.css";

import { Posts } from "../../dummyData";
import { useParams } from "react-router-dom";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import SinglePost from "../../components/singlePost/SinglePost";

export default function Postdetails() {
  const { postId } = useParams();
  const filterPosts = () => {
    return Posts.filter((p) => p.id === Number(postId));
  };
  return (
    <>
      <Topbar />
      <div className="postContainer">
        <Sidebar />
        <div className="feed">
          <div className="feedWrapper">
            <SinglePost post={filterPosts()[0]} />
          </div>
        </div>
        <Rightbar hideImg={false} />
      </div>
    </>
  );
}
