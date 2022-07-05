import "./readOnlyPost.css";

export default function ReadOnlyPost({ post }) {
  const postImg = post.img;

  return (
    <div className="readOnlyPost post">
      <div className="postWrapper">
        <div className="postCenter">
          {postImg && (
            <img
              src={`/images/posts/${postImg}`}
              alt="postImg"
              title={post.header}
            />
          )}
          <span className="postText">{post.desc}</span>
        </div>
      </div>
    </div>
  );
}
