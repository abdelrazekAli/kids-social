import "./post.css";

import { useState } from "react";
import { Link } from "react-router-dom";

import { Users } from "../../dummyData";

export default function Post({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [like, setLike] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

  const user = Users.filter((e, i) => {
    return e.id === post.userId;
  });

  const likeHandler = () => {
    console.log("clickeddd");
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/`}>
              <img
                className="postProfileImg"
                src={PF + user[0].profilePicture}
                alt=""
              />
            </Link>
            <div>
              <span className="postUsername">{user[0].username}</span>
              <span className="postDate">{post.date}</span>
            </div>
          </div>
        </div>
        <Link to={`/posts/${post.id}`}>
          <div className="postCenter">
            <span className="postText">{post?.desc}</span>
            <img className="postImg" src={PF + post.img} alt="" />
          </div>
        </Link>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like}</span>
          </div>
          <Link to={`/posts/${post.id}`}>
            <div className="postBottomRight">
              <span className="postCommentText">{post.comment} comments</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
