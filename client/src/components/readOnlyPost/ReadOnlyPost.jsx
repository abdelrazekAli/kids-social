import "./readOnlyPost.css";

export default function ReadOnlyPost({ post }) {
  const postImg = post.img;

  return (
    <div className="readOnlyPost post">
      <div className="postWrapper">
        <div className="postCenter">
          {postImg && (
            <img
              className="postImg"
              src={`/images/posts/${postImg}`}
              alt="postImg"
            />
          )}
          <span className="postText">{post.desc}</span>
        </div>
      </div>
    </div>
  );
}
