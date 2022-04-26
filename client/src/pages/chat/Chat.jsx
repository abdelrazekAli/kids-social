import "./chat.css";

import axios from "axios";
import { Send } from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { useContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

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

  useEffect(() => {
    arrivalMessage &&
      // currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users.filter((u) => u.userId !== user._id));
    });
  }, [user]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };
  useEffect(scrollToBottom, [messages]);

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
                    </div>
                    <span id="action_menu_btn">
                      <i className="fa fa-ellipsis-v"></i>
                    </span>
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
