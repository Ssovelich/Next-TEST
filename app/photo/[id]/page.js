import Link from "next/link";
import { fetchPhotoById } from "@/lib/unsplash";

export async function generateStaticParams() {
  const list = await fetchPhotos(1, 12);
  return list.map(photo => ({ id: photo.id }));
}

export async function generateMetadata({ params }) {
  const photo = await fetchPhotoById(params.id);
  return {
    title: photo.title,
    description: `Image by ${photo.author}`,
  };
}

export default async function PagePhoto({ params }) {
  const photo = await fetchPhotoById(params.id);
  console.log("Detail page photo:", photo);

  return (
    <div style={{ padding: "20px" }}>
      <Link href="/">← Go Back</Link>
      <h2>{photo.title}</h2>
      <p>
        Author:&nbsp;
        <a href={photo.authorLink} target="_blank" rel="noopener noreferrer">
          {photo.author}
        </a>
      </p>
      <img
        src={photo.fullUrl}
        alt={photo.title}
        style={{ marginTop: "20px", maxWidth: "100%", borderRadius: "8px" }}
      />
    </div>
  );
}
