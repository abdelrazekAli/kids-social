import "./share.css";
import { Context, axiosJWT } from "../../context/Context";
import { CircularProgress } from "@material-ui/core";
import { useRef, useState, useContext } from "react";
import { PermMedia, Cancel } from "@material-ui/icons";

export default function Share() {
  const desc = useRef();
  const { user } = useContext(Context);
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
          await axiosJWT({
            method: "post",
            url: "/api/v1/upload/images/posts",
            headers: {
              "auth-token": user.accessToken,
            },
            data: data,
          });
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
            src={
              user.img
                ? `/images/users/${user.img}`
                : `/assets/images/noAvatar.png`
            }
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
