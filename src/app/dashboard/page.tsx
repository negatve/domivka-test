// app/dashboard/page.tsx

export default function HomePage() {
  return (
    <main style={{ maxWidth: 700, margin: "40px auto", padding: "32px", background: "#fff", borderRadius: "16px", boxShadow: "0 4px 24px #0001" }}>
      <h1 style={{ color: "#66a05c", fontSize: "2.2rem", marginBottom: "1rem" }}>Домівка — сервіс для пошуку та оренди житла</h1>
      <p style={{ fontSize: "1.15rem", color: "#333", marginBottom: "1.5rem" }}>
        Ласкаво просимо на сайт <b>Домівка</b>! Тут ви можете швидко знайти, орендувати або купити квартиру, а також розмістити власне оголошення.
      </p>
      <ul style={{ fontSize: "1.05rem", color: "#444", marginBottom: "1.5rem", paddingLeft: "1.2em" }}>
        <li>Зручний пошук житла за різними параметрами</li>
        <li>Безпечна реєстрація та авторизація</li>
        <li>Особистий кабінет для керування оголошеннями</li>
        <li>Підтримка та консультації для користувачів</li>
      </ul>
      <p style={{ color: "#888" }}>
        Долучайтесь до нашої спільноти та знаходьте своє ідеальне житло разом з Домівкою!
      </p>
    </main>
  );
}