import "./post.css";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { axiosJWT, Context } from "../../context/Context";

export default function Post({ post }) {
  const postImg = post.img;
  const userImg = post.userId.img;

  const { user } = useContext(Context);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);
  const [commentsLength, setCommentsLength] = useState(0);

  const likeHandler = async () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
    await axiosJWT({
      method: "put",
      url: `/api/v1/posts/${post._id}/like`,
      headers: {
        "auth-token": user.accessToken,
      },
    });
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/v1/comments/${post._id}`);
        setCommentsLength(res.data.length);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [post._id]);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${post.userId._id}`}>
              <img
                className="postProfileImg"
                src={
                  userImg
                    ? `/images/users/${userImg}`
                    : `/assets/images/noAvatar.png`
                }
                alt="userImg"
              />
            </Link>
            <div>
              <Link to={`/profile/${post.userId._id}`}>
                <span className="postUsername">{post.userId.username}</span>
              </Link>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
          </div>
        </div>
        <Link
          to={{
            pathname: `/posts/${post._id}`,
            state: { isLiked: isLiked },
          }}
        >
          <div className="postCenter">
            <span className="postText">{post.desc}</span>
            {postImg && (
              <img
                className="postImg"
                src={`/images/posts/${postImg}`}
                alt="postImg"
              />
            )}
          </div>
        </Link>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`/assets/images/like.png`}
              alt=""
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{likes}</span>
          </div>
          <Link
            to={{
              pathname: `/posts/${post._id}`,
              state: { isLiked: isLiked },
            }}
          >
            <div className="postBottomRight">
              <span className="postCommentText">{commentsLength} Comments</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
