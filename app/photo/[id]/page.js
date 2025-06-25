import Link from "next/link";

function getPhotoData(id) {
  return {
    id,
    title: `Фото #${id}`,
    author: `Автор #${id}`,
    fullUrl: `https://picsum.photos/id/${id}/800/600`,
  };
}

export async function generateStaticParams() {
  const ids = Array.from({ length: 12 }, (_, i) => ({ id: (i + 10).toString() }));
  return ids;
}

export async function generateMetadata({ params }) {
  const photo = getPhotoData(params.id);
  return {
    title: photo.title,
    description: `Image from ${photo.author}`,
  };
}

export default async function PagePhoto({ params: { id } }) {
  const photo = getPhotoData(id);

  return (
    <div className="photo">
      <Link href="/">← Go Back</Link>
      <h2>{photo.title}</h2>
      <p>Author: {photo.author}</p>
      <img src={photo.fullUrl} alt={photo.title} style={{ marginTop: "20px", maxWidth: "100%" }} />
    </div>
  );
}
