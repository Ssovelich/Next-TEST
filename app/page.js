import Link from "next/link";

async function fetchData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const result = await res.json();
  return result;
}

export default async function Home() {
  const posts = await fetchData();

  return (
    <div>
      <h1>Головна сторінка</h1>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <Link href={`/post/` + post.id}>Переглянути деталі</Link>
        </div>
      ))}
    </div>
  );
}
