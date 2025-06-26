import styles from "./page.module.css";

export const metadata = {
  title: "About Us Page",
  description: "About Us — Photo Gallery",
};

export default function About() {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.titlePage}>About Us</h1>
      <h2 className={styles.title}>We are in love with light, moments, and stories.</h2>
      <ul className={styles.list}>
        <li className={styles.item}>
          Each frame holds a breath of life. We created this gallery not just to
          showcase photos, but to preserve moments that resonate in the heart.
          It's a space where reality blends with emotion — where every glance at
          an image brings back memories, feelings, people, and places.
        </li>
        <li className={styles.item}>
          We believe that photography is a language that needs no translation.
          Its words are shadows, colors, light, and movement. Through the lens,
          we don’t just freeze time — we try to capture warmth, tenderness,
          drama, and joy.
        </li>
        <li className={styles.item}>
          Our team is made up of photographers, travelers, and dreamers. We seek
          beauty in the little things — in strangers passing by, in sunsets, in
          architecture, and in the stillness of nature.
        </li>
        <li className={styles.item}>
          This site is our window to the world, and we’re happy you’ve looked
          inside. We hope that among these thousands of images, you’ll find one
          that speaks to you. Because true art is what stays with us long after
          we see it.
        </li>
        <li className={styles.item}><strong>Welcome to our story.</strong></li>
      </ul>
    </div>
  );
}
