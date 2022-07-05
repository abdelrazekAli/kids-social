import "./rightbar.css";
import axios from "axios";
import Online from "../online/Online";
import Friend from "../friend/Friend";
import { Context } from "../../context/Context";
import { useState, useEffect, useContext } from "react";

export default function Rightbar({
  user,
  home,
  online,
  hideImg,
  userFriends,
  onlineFriends,
}) {
  const [friends, setFriends] = useState([]);
  let { user: auth } = useContext(Context);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/api/v1/users/friends/${auth._id}`);
      setFriends(res.data);
    };
    fetchPosts();
  }, [auth._id]);

  const filterFriends = onlineFriends?.map((friend) =>
    friends.find((f) => f._id === friend.userId)
  );

  const HomeRightbar = () => {
    return (
      <>
        {!hideImg && (
          <img className="rightbarAd" src={"/assets/images/ad.jpg"} alt="" />
        )}
        <h4 className="rightbarTitle">Friends</h4>
        <div className=" rightbarFriendList">
          {friends.length > 0
            ? friends.map((u) => <Friend key={u._id} user={u} />)
            : "No friends"}
        </div>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <div className="btn-container"></div>
        <h4 className="rightbarTitle">Friends</h4>
        {userFriends?.length > 0 ? (
          <div className="rightbarFollowings">
            {userFriends.map((u) => (
              <Friend key={u._id} user={u} />
            ))}
          </div>
        ) : (
          <div className="feedWrapper">No friends</div>
        )}
      </>
    );
  };

  const OnlineRightbar = () => {
    return (
      <>
        <div className="btn-container"></div>
        {filterFriends?.length > 0 ? (
          <>
            <h4 className="rightbarTitle">Online friends</h4>
            <div className="rightbarFollowings">
              {filterFriends?.map((u) => (
                <Online key={u?._id} user={u} />
              ))}
            </div>
          </>
        ) : (
          <p className="no-online">No online friends</p>
        )}
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user && <ProfileRightbar />}
        {home && <HomeRightbar />}
        {online && <OnlineRightbar />}
      </div>
    </div>
  );
}
