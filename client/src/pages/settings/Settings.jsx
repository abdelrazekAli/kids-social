import "./settings.css";
import axios from "axios";
import { useContext, useState } from "react";
import { Context, axiosJWT } from "../../context/Context";

// Import components
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [email, setEmail] = useState(user?.email);
  const [username, setUsername] = useState(user?.username);
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      username,
      email,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.img = filename;
      try {
        await axios.post("/api/v1/upload", data);
      } catch (err) {
        dispatch({ type: "UPDATE_FAILURE" });
      }
    }
    try {
      const res = await axiosJWT({
        method: "put",
        url: `/api/v1/users/${user._id}`,
        headers: {
          "auth-token": user.accessToken,
        },
        data: updatedUser,
      });
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <>
      <Topbar />
      <div className="settingsContainer">
        <Sidebar />
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update Your Account</span>
          </div>
          <form className="settingsForm" onSubmit={handleSubmit}>
            <label>Profile Picture</label>
            <div className="settingsPP">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : user.img
                    ? PF + user.img
                    : `/assets/person/noAvatar.png`
                }
                alt=""
              />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle"></i>
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <label>Name</label>
            <input
              type="text"
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="settingsSubmit" type="submit">
              Update
            </button>
            {success && (
              <span
                style={{
                  color: "green",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                Profile has been updated...
              </span>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
