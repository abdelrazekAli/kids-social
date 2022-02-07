import "./chat.css";

import { Users } from "../../dummyData";
import { Send } from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Chat() {
  // Filter users
  let { userId } = useParams();
  const user = Users.filter((e) => {
    return e.id === Number(userId);
  });
  console.log(user);
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
                  <div className="position-relative d-flex justify-content-end mb-4">
                    <div className="msg_cotainer_send">
                      <div className="msg-content">Hi, How are you bro ?</div>
                    </div>
                    <span className="msg_time_send">11:55 AM</span>
                  </div>
                  <div className="position-relative d-flex justify-content-start mb-4">
                    <div className="msg_cotainer">
                      I'm good, What about you ?
                    </div>
                    <span className="msg_time">11:56 AM</span>
                  </div>
                  <div className="position-relative d-flex justify-content-end mb-4">
                    <div className="msg_cotainer_send">
                      <div className="msg-content">
                        I'm not fine, I was very ill bcz of winter
                      </div>
                    </div>
                    <span className="msg_time_send">11:57 AM</span>
                  </div>
                  <div className="position-relative d-flex justify-content-start mb-4">
                    <div className="msg_cotainer">
                      Opps, Sorry for not texting you last days
                    </div>
                    <span className="msg_time">11:59 AM</span>
                  </div>
                  <div className="position-relative d-flex justify-content-start mb-4">
                    <div className="msg_cotainer">Where are you now ?</div>
                    <span className="msg_time">12:00 PM</span>
                  </div>
                  <div className="position-relative d-flex justify-content-end mb-4">
                    <div className="msg_cotainer_send">
                      <div className="msg-content">I'm in home</div>
                    </div>
                    <span className="msg_time_send">12:02 PM</span>
                  </div>
                  <div className="position-relative d-flex justify-content-start mb-4">
                    <div className="msg_cotainer">On my way to you</div>
                    <span className="msg_time">12:05 PM</span>
                  </div>
                  <div className="position-relative d-flex justify-content-end mb-4">
                    <div className="msg_cotainer_send">
                      <div className="msg-content">
                        You're welcome anytime bro
                      </div>
                    </div>
                    <span className="msg_time_send">12:08 PM</span>
                  </div>
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
