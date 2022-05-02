import "./chat.css";

import axios from "axios";
import { v1 as uuid } from "uuid";
import { io } from "socket.io-client";
import Button from "@material-ui/core/Button";
import { Context } from "../../context/Context";
import { Link, useParams } from "react-router-dom";
import { Send, Videocam, Phone } from "@material-ui/icons";
import { useContext, useEffect, useState, useRef } from "react";
import { CircularProgress, IconButton } from "@material-ui/core";

// Import components
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Message from "../../components/message/Message";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Chat() {
  const socket = useRef();
  const { friendId } = useParams();
  const { user } = useContext(Context);
  const [friend, setFriend] = useState();
  const [loading, setLoading] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Messages
  const messagesEndRef = useRef();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [conversation, setConversation] = useState(0);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  // Call
  const [callId, setCallId] = useState(uuid());
  const [callType, setCallType] = useState("");
  const [offerCall, setOfferCall] = useState(false);

  // Get Friend data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get(`/api/v1/users/${friendId}`);
        setFriend(res1.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [friendId]);

  // Get Conversation
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res2 = await axios.get(
          `/api/v1/conversations/find/${friendId}/${user._id}`
        );
        setConversation(res2.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [user, friendId]);

  // Get Messages
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res3 = await axios.get(`/api/v1/messages/${conversation?._id}`);
        setMessages(res3.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [conversation]);

  // Realtime Chat with Web Wocket
  useEffect(() => {
    socket.current = io("ws://localhost:8900");

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        content: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // Set new messages
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  // Offer call
  useEffect(() => {
    socket.current.on("offering call", (data) => {
      console.log(data);
      setOfferCall(true);
      setCallType(data.callType);
      setCallId(data.callId);
    });
  }, []);

  // Get online friends
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users.filter((u) => u.userId !== user._id));
    });
  }, [user]);

  // Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (newMessage) {
      const msg = {
        sender: user._id,
        content: newMessage,
        conversationId: conversation._id,
      };

      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId: friendId,
        text: newMessage,
      });

      try {
        const res = await axios.post(`/api/v1/messages`, msg);
        setMessages([...messages, res.data]);
        setLoading(false);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Call user
  const callUser = (type) => {
    socket.current.emit("offering call", { friendId, callType: type, callId });
  };

  // Answer call
  const answerCall = () => {
    console.log(callType);
    let url;
    callType === "video"
      ? (url = `/room/video/${callId}`)
      : (url = `/room/voice/${callId}`);

    // Open room url in new tab
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;

    // Reset states
    setOfferCall(false);
    setCallType("");
    setCallId(uuid());
  };

  // Cancel call
  const cancelCall = () => {
    setOfferCall(false);
    socket.current.emit("canceling call", user.username);
  };

  // Scroll to last message
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };
  useEffect(scrollToBottom, [messages]);

  return (
    <>
      <Topbar />
      <div className="chatContainer">
        <Sidebar />
        <div className="container-fluid my-1">
          <div className="row justify-content-center h-100">
            {loading && (
              <div className="loading">
                <CircularProgress color="inherit" size="20px" />
              </div>
            )}
            <div className="col-md-8 col-xl-6 chat">
              {offerCall && (
                <div className="caller">
                  <div className="content">
                    <h4 className="text-center h4-fs">
                      {friend.username} is calling...
                    </h4>
                    <div className="call-btns">
                      <Button
                        variant="contained"
                        color="secondary"
                        className="end-btn"
                        onClick={cancelCall}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        className="bg-green m-1"
                        onClick={answerCall}
                      >
                        Answer
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              <div className="card card-chat">
                {friend && (
                  <div className="card-header msg_head">
                    <div className="d-flex bd-highlight">
                      <div className="img_cont">
                        <Link to={`/profile/${friendId}`}>
                          <img
                            src={
                              friend.img
                                ? `${PF}${friend.img}`
                                : `/assets/person/noAvatar.png`
                            }
                            className="rounded-circle user_img"
                            alt=""
                          />
                          {onlineUsers.find((o) => o.userId === friendId) && (
                            <div
                              className="rightbarOnlineLg"
                              title="Online now"
                            />
                          )}
                        </Link>
                      </div>
                      <div className="user_info">
                        <span>
                          <Link
                            to={`/profile/${friendId}`}
                            className="pro-link"
                          >
                            {friend.username}
                          </Link>
                        </span>
                        <p>Private chat</p>
                      </div>
                      <div className="call-btns ml-1">
                        <Link to={`/room/voice/${callId}`} target="_blank">
                          <IconButton
                            className="color-blue f-start"
                            title="Start a Voice call"
                            aria-label="call"
                            onClick={() => {
                              callUser("voice");
                            }}
                          >
                            <Phone className="color-blue fs-2" />
                          </IconButton>
                        </Link>
                        <Link to={`/room/video/${callId}`} target="_blank">
                          <IconButton
                            className="color-blue f-start"
                            title="Start a Video call"
                            aria-label="call"
                            onClick={() => {
                              callUser("video");
                            }}
                          >
                            <Videocam className="color-blue fs-2" />
                          </IconButton>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                <div id="message-container" className="card-body msg_card_body">
                  {messages.map((m) => (
                    <Message key={m._id} msg={m} own={m.sender === user._id} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="card-footer">
                  <div className="input-group">
                    <textarea
                      id="message"
                      name="msg-input"
                      className="form-control type_msg textarea-bd"
                      placeholder="Write your message..."
                      maxLength="10000"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      autoFocus
                    ></textarea>
                    <button
                      id="sendBtn"
                      className="input-group-append  justify-content-end d-flex send-btn"
                      disabled={loading}
                      onClick={(e) => sendMessage(e)}
                    >
                      <span className="input-group-text send_btn bg-white color-main">
                        <Send />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Rightbar hideImg={true} online={true} onlineFriends={onlineUsers} />
      </div>
    </>
  );
}
