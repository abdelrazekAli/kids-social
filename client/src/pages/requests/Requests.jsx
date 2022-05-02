import "./requests.css";
import axios from "axios";
import { Context } from "../../context/Context";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Request from "../../components/request/Request";
import { useState, useEffect, useContext } from "react";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Requests() {
  const { user } = useContext(Context);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const res = await axios.get(`/api/v1/users/friendRequests/${user._id}`);
      setRequests(res.data);
    };
    fetchRequests();
  }, [user._id]);

  return (
    <>
      <Topbar />
      <div className="RequestsContainer">
        <Sidebar />
        <div className="requests">
          {requests.length > 0 ? (
            requests.map((req) => <Request key={req._id} request={req} />)
          ) : (
            <h4 className="h4-fs m-1">There are no friend requests</h4>
          )}
        </div>
        <Rightbar home={true} />
      </div>
    </>
  );
}
