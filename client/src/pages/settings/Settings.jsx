import "./settings.css";
import axios from "axios";
import { useContext, useState } from "react";
import { Context, axiosJWT } from "../../context/Context";
import { CircularProgress } from "@material-ui/core";
import { Edit } from "@material-ui/icons";

// Import components
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [email, setEmail] = useState(user?.email);
  const [username, setUsername] = useState(user?.username);
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    msg: "",
  });

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleSubmit = async (e) => {
    setLoading(true);
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
        setLoading(false);
        setSuccess(false);
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
      setLoading(false);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      setLoading(false);
      setSuccess(false);
      dispatch({ type: "UPDATE_FAILURE" });
      if (err.response.status === 409) {
        setError({ isError: true, msg: "Email is already used" });
      } else {
        setError({ isError: true, msg: "Somthing went wrong!" });
      }
    }
  };
  return (
    <>
      <Topbar />
      <div className="settingsContainer">
        <Sidebar />
        <div className="settingsWrapper">
          {loading && (
            <div className="loading">
              <CircularProgress color="inherit" size="20px" />
            </div>
          )}
          <form className="settingsForm" onSubmit={handleSubmit}>
            <div className="settingsPP">
              <img
                className=""
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
                <span className="settingsPPIcon ">
                  <Edit className="color-green edit-icon" />
                </span>
              </label>
              <input
                type="file"
                id="fileInput"
                accept=".png,.jpeg,.jpg"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <label>Name</label>
            <input
              type="text"
              minLength={3}
              maxLength={20}
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="btn-container">
              <button
                disabled={loading}
                type="submit"
                className="btn btn-confirm settingsSubmit"
              >
                Update
              </button>
            </div>
            {success && (
              <span className="text-success">Profile has been updated.</span>
            )}
            {error.isError && <div>{error.msg}</div>}
          </form>
        </div>
      </div>
    </>
  );
}
