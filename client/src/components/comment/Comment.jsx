import "./comment.css";
import { useState, useContext } from "react";
import { Delete } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";
import { Context, axiosJWT } from "../../context/Context";
import { Link } from "react-router-dom";

export default function Comment({ comment }) {
  const userImg = comment.userId.img;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(false);

  const deleteHandler = async () => {
    setLoading(true);
    await axiosJWT({
      method: "delete",
      url: `/api/v1/comments/${comment._id}`,
      headers: {
        "auth-token": user.accessToken,
      },
    });
    setLoading(false);
    window.location.reload();
  };

  return (
    <div className="comment">
      <Link to={`/profile/${comment.userId._id}`}>
        <img
          className="comment-img"
          src={userImg ? `${PF}${userImg}` : `/assets/person/noAvatar.png`}
          alt="userImg"
        />
      </Link>
      <div className="comment-details comment-bg">
        <Link to={`/profile/${comment.userId._id}`}>
          <h4>{comment.userId.username}</h4>
        </Link>
        <div className="comment-body">
          <p>{comment.desc}</p>
        </div>
      </div>
      {comment.userId._id === user._id && (
        <Delete
          htmlColor="red"
          className="postDeleteIcon"
          onClick={deleteHandler}
        />
      )}
      {loading && (
        <div className="loading">
          <CircularProgress color="inherit" size="18px" />
        </div>
      )}
    </div>
  );
}
