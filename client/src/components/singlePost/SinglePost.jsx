import "./singlePost.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Comment from "../comment/Comment";
import { CircularProgress } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import { Context, axiosJWT } from "../../context/Context";
import { CommentSharp, Delete } from "@material-ui/icons";

export default function SinglePost({ post, liked }) {
  const postImg = post.img;
  const history = useHistory();
  const userImg = post.userId.img;
  const { user } = useContext(Context);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(liked);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);

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

  const likeHandler = async () => {
    await axiosJWT({
      method: "put",
      url: `/api/v1/posts/${post._id}/like`,
      headers: {
        "auth-token": user.accessToken,
      },
    });
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

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
          {post.userId._id === user._id && (
            <Delete
              htmlColor="red"
              className="postDeleteIcon"
              onClick={deleteHandler}
            />
          )}
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          {postImg && (
            <img className="postImg" src={`${PF}${postImg}`} alt="postImg" />
          )}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{likes}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">Comments</span>
          </div>
        </div>
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
        {comments.length > 0 &&
          comments.map((c) => <Comment key={c._id} comment={c} />)}
      </div>
    </div>
  );
}
