import "./chats.css";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import UserCard from "../../components/userCard/UserCard";

import { Users } from "../../dummyData";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="chatsContainer">
        <Sidebar />
        <div className="chats">
          <div className="chatsHeader">
            <p className="mb-1">Get in Touch </p>
            <p> Start Chat Your Family</p>
          </div>
          <div className="users">
            {Users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
