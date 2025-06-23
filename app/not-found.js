import Link from "next/link";

const NotFound = () => {
  return (
    <div>
        <h1>404 - Сторінку не знайдено</h1>
        <p>Вибачте, але сторінка, яку ви шукаєте, не існує 😢.</p>
        <Link href="/">Повернутися на головну</Link>
    </div>
  )
}

export default NotFound