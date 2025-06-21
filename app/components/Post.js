import Link from "next/link";

const Post = ({post}) => {
  return (
    <div>
      <Link href="/">Повернутися на головну</Link>
      <br />
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <strong>Автор ID: {post.userId}</strong>
    </div>
  );
};

export default Post;
