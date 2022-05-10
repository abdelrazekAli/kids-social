import "./post.css";
import axios from "axios";
import { format } from "timeago.js";
import Comment from "../comment/Comment";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import { Context, axiosJWT } from "../../context/Context";
import { CommentSharp, Delete } from "@material-ui/icons";

export default function Post({ post, feed }) {
  const postImg = post.img;
  const history = useHistory();
  const userImg = post.userId.img;
  const { user } = useContext(Context);

  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [showLikes, setShowLikes] = useState(false);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/v1/comments/${post._id}`);
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [post._id, loading]);

  // Handle add comment
  const commentHandler = async () => {
    if (comment.length > 0) {
      setLoading(true);
      const NewComment = { postId: post._id, desc: comment };
      await axiosJWT({
        method: "post",
        url: "/api/v1/comments",
        data: NewComment,
        headers: {
          "auth-token": user.accessToken,
        },
      });
      setLoading(false);
      setComment("");
    }
  };

  // Handle like
  const likeHandler = async () => {
    // Check if user already like post or not
    if (!likes.some((l) => l._id === user._id)) {
      // Add user to likes array
      setLikes([
        ...likes,
        {
          username: user.username,
          _id: user._id,
          img: user.img,
        },
      ]);
    } else {
      // Remove user from likes array
      setLikes(likes.filter((l) => l._id !== user._id));
    }

    // Put like into database
    try {
      await axiosJWT({
        method: "put",
        url: `/api/v1/posts/${post._id}/like`,
        headers: {
          "auth-token": user.accessToken,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Show/Hide likes after 3 seconds
  const toggleShowLikes = () => {
    if (!showLikes && likes.length > 0) {
      setShowLikes(true);
      setTimeout(() => {
        setShowLikes(false);
      }, 3000);
    } else {
      setShowLikes(false);
    }
  };

  // Handle delete post
  const deleteHandler = async () => {
    setLoading(true);
    await axiosJWT({
      method: "delete",
      url: `/api/v1/posts/${post._id}`,
      headers: {
        "auth-token": user.accessToken,
      },
    });
    setLoading(false);
    history.goBack();
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
                  userImg
                    ? `/images/users/${userImg}`
                    : `/assets/images/noAvatar.png`
                }
                alt="user Img"
              />
            </Link>
            <div>
              <Link to={`/profile/${post.userId._id}`}>
                <span className="postUsername">{post.userId.username}</span>
              </Link>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
          </div>
          {!feed && post.userId._id === user._id && (
            <Delete
              htmlColor="red"
              className="postDeleteIcon"
              onClick={deleteHandler}
            />
          )}
        </div>
        <Link to={`/posts/${post._id}`}>
          <div className="postCenter">
            <span className="postText">{post.desc}</span>
            {postImg && (
              <img
                className="postImg"
                src={`/images/posts/${postImg}`}
                alt="post Img"
              />
            )}
          </div>
        </Link>
        <div className="postBottom">
          <div className="postBottomLeft">
            {showLikes && (
              <ul className="likes-users">
                {likes.length > 0 &&
                  likes.map((like) => (
                    <li key={like._id}>
                      <Link to={`/profile/${like._id}`}>{like.username}</Link>
                    </li>
                  ))}
              </ul>
            )}
            <img
              className="likeIcon"
              src={"/assets/images/like.png"}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter" onClick={toggleShowLikes}>
              {likes.length}
            </span>
          </div>
          <Link to={`/posts/${post._id}`}>
            <div className="postBottomRight">
              <span className="postCommentText">
                {comments.length} Comments
              </span>
            </div>
          </Link>
        </div>
        {!feed && (
          <>
            <div className="input-group mt-2 ">
              <textarea
                id="message"
                name="comment-input"
                style={{ resize: "none" }}
                className="form-control type_msg textarea-bd comment-bg"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                maxLength="10000"
              ></textarea>
              <div className="input-group-append  justify-content-end d-flex">
                <button
                  onClick={commentHandler}
                  disabled={loading}
                  className="input-group-text send_btn comment-bg color-main"
                >
                  <CommentSharp />
                </button>
              </div>
            </div>
            {loading && (
              <div className="loading">
                <CircularProgress color="inherit" size="25px" />
              </div>
            )}
            {comments.length > 0 ? (
              comments.map((c) => <Comment key={c._id} comment={c} />)
            ) : (
              <span className="no-comments">No comments yet</span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
