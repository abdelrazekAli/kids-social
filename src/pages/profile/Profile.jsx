import "./profile.css";

import Feed from "../../components/feed/Feed";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileUserImg"
                src={PF + "person/noAvatar.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">Username</h4>
            </div>
          </div>
          <div className="profileRightBottom">
            <Rightbar user={true} />
            <h4 className="rightbarTitle">User Posts</h4>
            <Feed share={false} />
          </div>
        </div>
      </div>
    </>
  );
}
