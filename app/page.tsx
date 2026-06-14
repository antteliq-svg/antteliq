export default function Home() {
  return (
    <main style={{ fontFamily: "sans-serif" }}>
      
      {/* ヘッダー */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        borderBottom: "1px solid #eee"
      }}>
        <h2>Antteliq</h2>
        <nav>
          <a href="#" style={{ marginRight: 20 }}>About</a>
          <a href="#" style={{ marginRight: 20 }}>Services</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      {/* ヒーロー */}
      <section style={{
        textAlign: "center",
        padding: "100px 20px",
        background: "#0f172a",
        color: "white"
      }}>
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
          Build Your Future with Antteliq
        </h1>
        <p style={{ marginBottom: "30px" }}>
          Web開発・システム構築をシンプルに
        </p>
        <button style={{
          padding: "10px 20px",
          background: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}>
          Get Started
        </button>
      </section>

      {/* サービス */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2>Our Services</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "40px" }}>
          <div>
            <h3>Web Development</h3>
            <p>Next.jsによる高速なWeb開発</p>
          </div>
          <div>
            <h3>Database</h3>
            <p>Supabase / PostgreSQL対応</p>
          </div>
          <div>
            <h3>Cloud</h3>
            <p>Vercelで簡単デプロイ</p>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer style={{
        padding: "20px",
        textAlign: "center",
        borderTop: "1px solid #eee"
      }}>
        <p>© 2026 Antteliq</p>
      </footer>

    </main>
  );
}