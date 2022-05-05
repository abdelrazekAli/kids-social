import "./share.css";
import axios from "axios";
import { Context, axiosJWT } from "../../context/Context";
import { CircularProgress } from "@material-ui/core";
import { useRef, useState, useContext } from "react";
import { PermMedia, Cancel } from "@material-ui/icons";

export default function Share() {
  const desc = useRef();
  const { user } = useContext(Context);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file || newPost.desc) {
      setLoading(true);
      if (file) {
        const data = new FormData();
        const fileName = `${Date.now()}_${file.name}`;
        data.append("name", fileName);
        data.append("file", file);
        newPost.img = fileName;
        console.log(newPost);
        try {
          await axios.post("/api/v1/upload", data);
        } catch (err) {
          console.log(err);
        }
      }
      try {
        await axiosJWT.post("/api/v1/posts", newPost, {
          headers: {
            "auth-token": user.accessToken,
          },
        });

        setLoading(false);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user.img ? `${PF}${user.img}` : `/assets/person/noAvatar.png`}
            alt="userImg"
          />
          <input placeholder="Write a post" className="shareInput" ref={desc} />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="#ec4747" className="shareIcon" />
              <span className="shareOptionText">Photo | Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
          <button className="shareButton" type="submit" disabled={loading}>
            Post
          </button>
        </form>
      </div>
      {loading && (
        <div className="loading">
          <CircularProgress color="inherit" size="25px" />
        </div>
      )}
    </div>
  );
}
