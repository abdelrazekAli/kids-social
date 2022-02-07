import "./rightbar.css";

// import { useState } from "react";

import Online from "../online/Online";
import { Users } from "../../dummyData";

// import { Remove } from "@material-ui/icons";
// import PersonAddIcon from "@material-ui/icons/PersonAdd";

export default function Rightbar({ user, hideImg }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const [followed, setFollowed] = useState(false);

  // const handleClick = async () => {
  //   setFollowed(!followed);
  // };

  const HomeRightbar = () => {
    return (
      <>
        {!hideImg && <img className="rightbarAd" src={PF + "ad.jpg"} alt="" />}
        <h4 className="rightbarTitle">Family</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <div className="btn-container">
          {/* <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? <Remove /> : <PersonAddIcon className="pr-5" />}
            {followed ? "Cancel Request" : "Add Relative"}
          </button> */}
        </div>
        <h4 className="rightbarTitle">User Family</h4>
        <div className="rightbarFollowings">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </div>
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
