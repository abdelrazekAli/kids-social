import "./requests.css";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Request from "../../components/request/Request";
import Rightbar from "../../components/rightbar/Rightbar";

import { userRequests } from "../../dummyData";

export default function Requests() {
  return (
    <>
      <Topbar />
      <div className="RequestsContainer">
        <Sidebar />
        <div className="requests">
          {userRequests.map((req) => (
            <Request key={req.id} request={req} />
          ))}
        </div>
        <Rightbar />
      </div>
    </>
  );
}
