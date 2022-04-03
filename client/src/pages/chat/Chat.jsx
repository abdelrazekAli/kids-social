import "./chat.css";

import { Users } from "../../dummyData";
import { Send } from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Message from "../../components/message/Message";

export default function Chat({ own }) {
  // Filter users
  let { userId } = useParams();
  const user = Users.filter((e) => {
    return e.id === userId;
  });

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <Topbar />
      <div className="chatContainer">
        <Sidebar />
        <div className="container-fluid my-1">
          <input id="chat-id" type="hidden" value="<%= chatId %>" />
          <input
            id="friendId"
            type="hidden"
            name="friendId"
            value="<%= friendData.id %>"
          />
          <div className="row justify-content-center h-100">
            <div className="col-md-8 col-xl-6 chat">
              <div className="card card-chat">
                <div className="card-header msg_head">
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <Link to={`/chat/${user[0].id}`}>
                        <img
                          src={PF + user[0].profilePicture}
                          className="rounded-circle user_img"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="user_info">
                      <span>
                        <Link to={`/chat/${user[0].id}`} className="pro-link">
                          {user[0].username}
                        </Link>
                      </span>
                      <p>Private chat</p>
                    </div>
                  </div>
                  <span id="action_menu_btn">
                    <i className="fa fa-ellipsis-v"></i>
                  </span>
                </div>
                <div id="message-container" className="card-body msg_card_body">
                  <Message
                    msg={{ text: "Hi, How are you bro ?", date: "12:10 AM" }}
                    own={true}
                  />
                  <Message
                    msg={{
                      text: "I'm good, What about you ?",
                      date: "06:30 PM",
                    }}
                  />
                </div>
                <div className="card-footer">
                  <div className="input-group">
                    <textarea
                      id="message"
                      name="msg-input"
                      className="form-control type_msg textarea-bd"
                      placeholder="Write your message..."
                      maxLength="10000"
                      autoFocus
                    ></textarea>
                    <div
                      id="sendBtn"
                      className="input-group-append  justify-content-end d-flex"
                    >
                      <span className="input-group-text send_btn bg-white color-main">
                        <Send />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Rightbar hideImg={true} />
      </div>
    </>
  );
}
