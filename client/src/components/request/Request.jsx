import "./request.css";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { CircularProgress } from "@material-ui/core";
import { Context, axiosJWT } from "../../context/Context";

const Request = ({ request }) => {
  const { user } = useContext(Context);
  const userImg = request.img;
  const [loading, setLoading] = useState(false);

  const confirmHandler = async () => {
    setLoading(true);
    await axiosJWT({
      method: "put",
      url: `/api/v1/users/${request._id}/accept`,
      headers: {
        "auth-token": user.accessToken,
      },
    });
    setLoading(false);
    window.location.reload();
  };

  const deleteHandler = async () => {
    setLoading(true);
    await axiosJWT({
      method: "delete",
      url: `/api/v1/users/${request._id}/reject`,
      headers: {
        "auth-token": user.accessToken,
      },
    });
    setLoading(false);
    window.location.reload();
  };

  return (
    <div className="request">
      <Link to={`/profile/${request._id}`}>
        <img
          className="req-img"
          src={
            userImg ? `/images/users/${userImg}` : `/assets/images/noAvatar.png`
          }
          alt="userImg"
        />
      </Link>
      <div className="req-details">
        <Link to={`/profile/${request._id}`}>
          <h3>{request.username}</h3>
        </Link>
        <div className="req-buttons">
          <button
            onClick={confirmHandler}
            disabled={loading}
            className="btn btn-confirm"
          >
            Confirm
          </button>
          <button
            onClick={deleteHandler}
            disabled={loading}
            className="btn btn-delete"
          >
            Delete
          </button>
        </div>
      </div>
      {loading && (
        <div className="loading">
          <CircularProgress color="inherit" size="20px" />
        </div>
      )}
    </div>
  );
};

export default Request;
