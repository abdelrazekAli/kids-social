import "./profile.css";
import axios from "axios";
import Feed from "../../components/feed/Feed";
import { Link, useParams } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import { CircularProgress } from "@material-ui/core";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import { Context, axiosJWT } from "../../context/Context";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Profile() {
  const { userId } = useParams();
  const { user } = useContext(Context);

  const [auth, setAuth] = useState();
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);

  const userImg = profile?.img;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Get profile user
        const res1 = await axios.get(`/api/v1/users/${userId}`);
        setProfile(res1.data);

        // Get auth user
        const res2 = await axios.get(`/api/v1/users/${user._id}`);
        setAuth(res2.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [userId, user._id]);

  const confirmHandler = async () => {
    setLoading(true);
    await axiosJWT({
      method: "put",
      url: `/api/v1/users/${profile._id}/accept`,
      headers: {
        "auth-token": user.accessToken,
      },
    });
    setLoading(false);
    window.location.reload();
  };

  const addHandler = async () => {
    setLoading(true);
    await axiosJWT({
      method: "put",
      url: `/api/v1/users/${profile._id}/add`,
      headers: {
        "auth-token": user.accessToken,
      },
    });
    setLoading(false);
    window.location.reload();
  };

  const cancelHandler = async () => {
    setLoading(true);
    await axiosJWT({
      method: "delete",
      url: `/api/v1/users/${profile._id}/cancel`,
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
      url: `/api/v1/users/${profile._id}/reject`,
      headers: {
        "auth-token": user.accessToken,
      },
    });
    setLoading(false);
    window.location.reload();
  };

  const unfriendHandler = async () => {
    setLoading(true);
    await axiosJWT({
      method: "put",
      url: `/api/v1/users/${profile._id}/delete`,
      headers: {
        "auth-token": user.accessToken,
      },
    });
    setLoading(false);
    window.location.reload();
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        {profile && auth && (
          <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
                <img
                  className="profileUserImg"
                  src={
                    userImg
                      ? `/images/users/${userImg}`
                      : `/assets/images/noAvatar.png`
                  }
                  alt="userImg"
                />
              </div>
              <div className="profileInfo">
                <h4 className="profileInfoName">{profile.username}</h4>
              </div>
            </div>
            {user._id !== profile._id && (
              <div className="btn-container">
                {auth.friends.find((u) => u._id === profile._id) ? (
                  <>
                    <button
                      onClick={unfriendHandler}
                      disabled={loading}
                      className="btn btn-red"
                    >
                      Unfriend
                    </button>
                    <button disabled={loading} className="btn btn-confirm">
                      <Link to={`/chat/${userId}`} className="color-light">
                        Chat
                      </Link>
                    </button>
                  </>
                ) : auth.sentRequests.find((u) => u._id === profile._id) ? (
                  <button
                    onClick={cancelHandler}
                    disabled={loading}
                    className="btn btn-red"
                  >
                    Cancel
                  </button>
                ) : auth.friendRequests.find((u) => u._id === profile._id) ? (
                  <>
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
                  </>
                ) : (
                  <button
                    onClick={addHandler}
                    disabled={loading}
                    className=" btn btn-confirm"
                  >
                    Add
                  </button>
                )}
              </div>
            )}
            {loading && (
              <div className="loading">
                <CircularProgress color="inherit" size="20px" />
              </div>
            )}
            <div className="profileRightBottom">
              <Rightbar user={true} userFriends={profile.friends} />
              <h4 className="rightbarTitle">Posts</h4>
              <Feed share={false} profile={userId} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
