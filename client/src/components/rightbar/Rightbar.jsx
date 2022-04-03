import "./rightbar.css";
import axios from "axios";
import Online from "../online/Online";
import { Context } from "../../context/Context";
import { useState, useEffect, useContext } from "react";

export default function Rightbar({ user, hideImg, userFamily }) {
  const [family, setFamily] = useState([]);
  let { user: auth } = useContext(Context);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/api/v1/users/family/${auth._id}`);
      setFamily(res.data);
    };
    fetchPosts();
  }, [auth._id]);

  const HomeRightbar = () => {
    return (
      <>
        {!hideImg && (
          <img className="rightbarAd" src={"/assets/ad.jpg"} alt="" />
        )}
        <h4 className="rightbarTitle">Family</h4>
        <div className=" rightbarFriendList">
          {family.length > 0 &&
            family.map((u) => <Online key={u._id} user={u} />)}
        </div>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <div className="btn-container"></div>
        {userFamily?.length > 0 && (
          <>
            <h4 className="rightbarTitle">Family</h4>
            <div className="rightbarFollowings">
              {userFamily.map((u) => (
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
