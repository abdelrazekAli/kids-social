import axios from "axios";
import "./postdetails.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Post from "../../components/post/Post";

export default function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res1 = await axios.get(`/api/v1/posts/${postId}`);
        setPost(res1.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [postId]);

  return (
    <>
      <Topbar />
      <div className="postContainer">
        <Sidebar />
        <div className="feed">
          <div className="feedWrapper">{post && <Post post={post} />}</div>
        </div>
        <Rightbar hideImg={false} home={true} />
      </div>
    </>
  );
}
