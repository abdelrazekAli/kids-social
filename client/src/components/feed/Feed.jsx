import "./feed.css";
import axios from "axios";
import Post from "../post/Post";
import Share from "../share/Share";
import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";

export default function Feed({ share, profile }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchPosts = async () => {
      let res;
      profile
        ? (res = await axios.get(`/api/v1/posts/user/${profile}`))
        : (res = await axios.get(`/api/v1/posts/timeline/${user._id}`));
      setPosts(res.data);
    };
    fetchPosts();
  }, [user._id, profile]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {share && <Share />}
        {posts.length > 0 && posts.map((p) => <Post key={p._id} post={p} />)}
      </div>
    </div>
  );
}
