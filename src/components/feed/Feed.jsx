import "./feed.css";

import Post from "../post/Post";
import Share from "../share/Share";

import { Posts } from "../../dummyData";

export default function Feed({ share }) {
  return (
    <div className="feed">
      <div className="feedWrapper">
        {share && <Share />}
        {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
