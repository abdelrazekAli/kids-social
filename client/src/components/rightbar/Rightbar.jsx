import "./rightbar.css";
import axios from "axios";
import Online from "../online/Online";
import { Context } from "../../context/Context";
import { useState, useEffect, useContext } from "react";

export default function Rightbar({ user, hideImg, userFriends }) {
  const [friends, setFriends] = useState([]);
  let { user: auth } = useContext(Context);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/api/v1/users/friends/${auth._id}`);
      setFriends(res.data);
    };
    fetchPosts();
  }, [auth._id]);

  const HomeRightbar = () => {
    return (
      <>
        {!hideImg && (
          <img className="rightbarAd" src={"/assets/ad.jpg"} alt="" />
        )}
        <h4 className="rightbarTitle">Friends</h4>
        <div className=" rightbarFriendList">
          {friends.length > 0 &&
            friends.map((u) => <Online key={u._id} user={u} />)}
        </div>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <div className="btn-container"></div>
        {userFriends?.length > 0 && (
          <>
            <h4 className="rightbarTitle">friends</h4>
            <div className="rightbarFollowings">
              {userFriends.map((u) => (
                <Online key={u._id} user={u} />
              ))}
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
