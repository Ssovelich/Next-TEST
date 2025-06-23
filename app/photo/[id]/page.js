import Link from "next/link";

async function fetchData(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
  const result = await res.json();
  return result;
}

export async function generateStaticParams() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/photos?_limit=12"
  );
  const photos = await res.json();
  return photos.map((photo) => ({
    id: photo.id.toString(),
  }));
}

export async function generateMetadata({ params }) {
  const photo = await fetchData(params.id);
  return {
    title: "Фото - " + photo.title,
    description: "Фото з JSONPlaceholder",
  };
}

const PagePhoto = async ({ params: { id } }) => {
  const photo = await fetchData(id);

  return (
    <div>
      <Link href="/">Повернутись на головну</Link>
      <h2>{photo.title}</h2>
      <img src={photo.url} alt={photo.title} />
      <p>Альбом ID: {photo.albumId}</p>
    </div>
  );
}

export default PagePhoto
