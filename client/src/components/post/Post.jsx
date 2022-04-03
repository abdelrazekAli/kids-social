import "./post.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { axiosJWT, Context } from "../../context/Context";

export default function Post({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const postImg = post.img;
  const userImg = post.userId.img;

  const { user } = useContext(Context);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);

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

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${post.userId._id}`}>
              <img
                className="postProfileImg"
                src={
                  userImg ? `${PF}${userImg}` : `/assets/person/noAvatar.png`
                }
                alt="userImg"
              />
            </Link>
            <div>
              <Link to={`/profile/${post.userId._id}`}>
                <span className="postUsername">{post.userId.username}</span>
              </Link>
              <span className="postDate">
                {new Date(post.createdAt).toLocaleString()}
              </span>
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
              <img className="postImg" src={`${PF}${postImg}`} alt="postImg" />
            )}
          </div>
        </Link>
        <div className="postBottom">
          <div className="postBottomLeft" onClick={likeHandler}>
            <img className="likeIcon" src={`${PF}like.png`} alt="" />
            <span className="postLikeCounter">{likes}</span>
          </div>
          <Link
            to={{
              pathname: `/posts/${post._id}`,
              state: { isLiked: isLiked },
            }}
          >
            <div className="postBottomRight">
              <span className="postCommentText">Comments</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
