const ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

export const fetchPhotos = async (page = 1, perPage = 9) => {
  const res = await fetch(
    `https://api.unsplash.com/photos?page=${page}&per_page=${perPage}&client_id=${ACCESS_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch photos");
  const data = await res.json();
  return data.map(item => ({
    id: item.id,
    title: item.description || item.alt_description || "Untitled",
    thumbnailUrl: item.urls.small,
    fullUrl: item.urls.full,
    author: item.user.name,
    authorLink: item.user.links.html,
    liked: false,
  }));
};

export const fetchPhotoById = async (id) => {
  const res = id
    ? await fetch(`https://api.unsplash.com/photos/${id}?client_id=${ACCESS_KEY}`)
    : await fetch(`https://api.unsplash.com/photos?page=1&per_page=12&client_id=${ACCESS_KEY}`);

  if (!res.ok) throw new Error("Failed to fetch photo");
  const item = await res.json();
  
  const data = id ? item : item;
  const arr = Array.isArray(data) ? data : [data];

  return arr.map(item => ({
    id: item.id,
    title: item.description || item.alt_description || "Untitled",
    fullUrl: item.urls.full,
    author: item.user.name,
    authorLink: item.user.links.html,
  }))[0];
};
