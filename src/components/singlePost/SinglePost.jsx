import "./singlePost.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import { CommentSharp } from "@material-ui/icons";

import { Users } from "../../dummyData";
import Comment from "../comment/Comment";

export default function SinglePost({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [like, setLike] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

  const user = Users.filter((e, i) => {
    return e.id === post.userId;
  });

  const likeHandler = () => {
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
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
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
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
        <div className="input-group mt-2 ">
          <textarea
            id="message"
            name="msg-input"
            className="form-control type_msg textarea-bd comment-bg"
            placeholder="Write a comment..."
            maxLength="10000"
          ></textarea>
          <div
            id="sendBtn"
            className="input-group-append  justify-content-end d-flex"
          >
            <span className="input-group-text send_btn comment-bg color-main">
              <CommentSharp />
            </span>
          </div>
        </div>
        {Users.map((u) => (
          <Comment user={u} key={u.id} />
        ))}
      </div>
    </div>
  );
}
