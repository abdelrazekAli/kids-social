import "./chat.css";

import axios from "axios";
import Peer from "simple-peer";
import { io } from "socket.io-client";
import Button from "@material-ui/core/Button";
import { Link, useParams } from "react-router-dom";
import { Send, Videocam } from "@material-ui/icons";
import { useContext, useEffect, useState, useRef } from "react";
import { CircularProgress, IconButton } from "@material-ui/core";

import { Context } from "../../context/Context";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Message from "../../components/message/Message";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Chat() {
  const socket = useRef();
  const messagesEndRef = useRef();
  const { friendId } = useParams();
  const { user } = useContext(Context);
  const [friend, setFriend] = useState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [conversation, setConversation] = useState(0);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  // Video call
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const [stream, setStream] = useState();
  const [callStarted, setCallStarted] = useState(false);
  const [streamStarted, setStreamStarted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [receivingCall, setReceivingCall] = useState(false);

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

    socket.current.on("callUser", ({ signal }) => {
      setReceivingCall(true);
      setCallerSignal(signal);
    });
  }, []);

  // Get user camera and audio
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (streamStarted) {
          myVideo.current.srcObject = stream;
        }
      });
  }, [streamStarted]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

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

  // Start video call
  const callUser = () => {
    setCallStarted(true);
    setStreamStarted(true);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: friendId,
        signal: data,
        from: user._id,
        name: friend.username,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.current.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  // Answer video call
  const answerCall = () => {
    setStreamStarted(true);
    setCallStarted(true);
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (data) => {
      socket.current.emit("answerCall", { signal: data, to: friendId });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  // Leave video call
  const leaveCall = () => {
    setCallEnded(true);
    setCallStarted(false);
    setStreamStarted(false);
    connectionRef.current.destroy();
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
              {/* Video call */}
              <div className="video-container">
                {callStarted && (
                  <h4 className="text-center h4-fs">
                    You're calling {friend.username}
                  </h4>
                )}
                {receivingCall && !callAccepted ? (
                  <div className="caller">
                    <h4 className="text-center h4-fs">
                      {friend.username} is calling...
                    </h4>
                    <Button
                      variant="contained"
                      className="bg-green m-1"
                      onClick={answerCall}
                    >
                      Answer
                    </Button>
                  </div>
                ) : null}
                <div className="video">
                  {callAccepted && !callEnded ? (
                    <video
                      playsInline
                      ref={userVideo}
                      autoPlay
                      style={{ width: "600px" }}
                    />
                  ) : null}
                </div>
                {streamStarted && (
                  <video
                    playsInline
                    muted
                    ref={myVideo}
                    autoPlay
                    style={{ width: "200px" }}
                    className="user-video"
                  />
                )}
                {callStarted && !callEnded ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    className="end-btn"
                    onClick={leaveCall}
                  >
                    End Call
                  </Button>
                ) : null}
              </div>
              {/* /Video call */}
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
                      <IconButton
                        className="color-blue"
                        title="Start a Video call"
                        aria-label="call"
                        onClick={callUser}
                      >
                        <Videocam fontSize="large" className="color-blue" />
                      </IconButton>
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
