import { useState } from "react";

const books = [
  { id: 1, title: "The Midnight Library", author: "Matt Haig", genre: "Fiction", available: true, img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80" },
  { id: 2, title: "Sapiens", author: "Yuval Noah Harari", genre: "History", available: false, img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80" },
  { id: 3, title: "Meditations", author: "Marcus Aurelius", genre: "Philosophy", available: true, img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&q=80" },
  { id: 4, title: "A Brief History of Time", author: "Stephen Hawking", genre: "Science", available: true, img: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=300&q=80" },
  { id: 5, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", available: false, img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&q=80" },
  { id: 6, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", genre: "Science", available: true, img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&q=80" },
];

const genres = ["All", "Fiction", "History", "Philosophy", "Science"];

const stats = [
  { num: "120K+", label: "Books" },
  { num: "34K", label: "Members" },
  { num: "18", label: "Rooms" },
  { num: "75+", label: "Years" },
];

export default function Home() {
  const [activeGenre, setActiveGenre] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = books.filter((b) => {
    const matchGenre = activeGenre === "All" || b.genre === activeGenre;
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    return matchGenre && matchSearch;
  });

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#F9F6F1", minHeight: "100vh", color: "#1C1814" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Jost:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Jost', sans-serif; }
        .lib-nav { position: sticky; top: 0; z-index: 100; background: #FDFAF5; border-bottom: 1px solid #E4DCCC; display: flex; align-items: center; justify-content: space-between; padding: 1rem 2.5rem; }
        .lib-brand { font-family: 'Lora', serif; font-size: 1.45rem; font-weight: 600; letter-spacing: -0.5px; color: #1C1814; }
        .lib-brand em { font-style: italic; color: #B5651D; }
        .nav-links { display: flex; gap: 2rem; list-style: none; }
        .nav-links a { font-family: 'Jost', sans-serif; font-size: 0.82rem; color: #7A6A5A; text-decoration: none; letter-spacing: 0.05em; text-transform: uppercase; transition: color .2s; }
        .nav-links a:hover { color: #1C1814; }
        .btn-join { background: #1C1814; color: #F9F6F1; border: none; padding: .45rem 1.1rem; font-size: .78rem; font-family: 'Jost', sans-serif; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; transition: background .2s; }
        .btn-join:hover { background: #B5651D; }

        .hero { display: grid; grid-template-columns: 1fr 1fr; min-height: 82vh; }
        .hero-left { display: flex; flex-direction: column; justify-content: center; padding: 4rem 3rem 4rem 4rem; }
        .hero-tag { font-family: 'Jost', sans-serif; font-size: .7rem; letter-spacing: .2em; text-transform: uppercase; color: #B5651D; margin-bottom: 1.2rem; }
        .hero-h1 { font-family: 'Lora', serif; font-size: clamp(2.2rem, 4vw, 3.4rem); line-height: 1.15; letter-spacing: -.5px; margin-bottom: 1.2rem; }
        .hero-h1 em { font-style: italic; color: #B5651D; }
        .hero-desc { font-family: 'Jost', sans-serif; font-size: .97rem; color: #7A6A5A; line-height: 1.8; font-weight: 300; max-width: 380px; margin-bottom: 2.2rem; }
        .hero-btns { display: flex; gap: .8rem; flex-wrap: wrap; }
        .btn-primary { background: #1C1814; color: #F9F6F1; border: none; padding: .75rem 1.8rem; font-size: .82rem; font-family: 'Jost', sans-serif; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; transition: background .2s; }
        .btn-primary:hover { background: #B5651D; }
        .btn-outline { background: transparent; color: #1C1814; border: 1px solid #1C1814; padding: .73rem 1.8rem; font-size: .82rem; font-family: 'Jost', sans-serif; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; transition: all .2s; }
        .btn-outline:hover { background: #1C1814; color: #F9F6F1; }
        .hero-right { position: relative; overflow: hidden; }
        .hero-right img { width: 100%; height: 100%; object-fit: cover; }
        .hero-right-overlay { position: absolute; inset: 0; background: linear-gradient(to right, #F9F6F1 0%, transparent 18%); }

        .stats-bar { background: #1C1814; display: flex; justify-content: space-around; padding: 1.8rem 2rem; flex-wrap: wrap; gap: 1rem; }
        .stat { text-align: center; }
        .stat-num { font-family: 'Lora', serif; font-size: 1.8rem; font-weight: 600; color: #F9F6F1; line-height: 1; }
        .stat-lbl { font-family: 'Jost', sans-serif; font-size: .7rem; letter-spacing: .15em; text-transform: uppercase; color: #7A6A5A; margin-top: .3rem; }

        .catalogue { padding: 5rem 3rem; }
        .sec-tag { font-family: 'Jost', sans-serif; font-size: .7rem; letter-spacing: .2em; text-transform: uppercase; color: #B5651D; margin-bottom: .6rem; text-align: center; }
        .sec-title { font-family: 'Lora', serif; font-size: clamp(1.7rem, 3vw, 2.4rem); text-align: center; letter-spacing: -.3px; margin-bottom: 2.5rem; }
        .sec-title em { font-style: italic; color: #B5651D; }

        .filters { display: flex; align-items: center; gap: .6rem; flex-wrap: wrap; margin-bottom: 1.5rem; justify-content: center; }
        .filter-pill { font-family: 'Jost', sans-serif; font-size: .78rem; padding: .38rem .9rem; border: 1px solid #D4C9B8; background: transparent; cursor: pointer; letter-spacing: .05em; transition: all .2s; color: #7A6A5A; }
        .filter-pill.active, .filter-pill:hover { background: #1C1814; color: #F9F6F1; border-color: #1C1814; }

        .search-wrap { display: flex; justify-content: center; margin-bottom: 2.5rem; }
        .search-input { width: 100%; max-width: 380px; padding: .55rem 1rem; border: 1px solid #D4C9B8; background: #FDFAF5; font-family: 'Jost', sans-serif; font-size: .88rem; color: #1C1814; outline: none; }
        .search-input:focus { border-color: #B5651D; }

        .book-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1.5rem; }
        .book-card { background: #FDFAF5; border: 1px solid #E4DCCC; overflow: hidden; transition: transform .25s, box-shadow .25s; }
        .book-card:hover { transform: translateY(-5px); box-shadow: 0 12px 32px rgba(28,24,20,.1); }
        .book-img { width: 100%; height: 180px; object-fit: cover; display: block; }
        .book-body { padding: 1rem; }
        .book-genre-tag { font-family: 'Jost', sans-serif; font-size: .62rem; letter-spacing: .15em; text-transform: uppercase; color: #B5651D; margin-bottom: .4rem; }
        .book-title { font-family: 'Lora', serif; font-size: .92rem; font-weight: 600; line-height: 1.3; margin-bottom: .25rem; }
        .book-author { font-family: 'Jost', sans-serif; font-size: .78rem; color: #7A6A5A; font-weight: 300; margin-bottom: .7rem; }
        .badge-avail { font-family: 'Jost', sans-serif; font-size: .62rem; letter-spacing: .08em; text-transform: uppercase; font-weight: 500; padding: .22rem .6rem; }
        .badge-yes { background: #EEFAF3; color: #2E7D52; border: 1px solid #A8DFC0; }
        .badge-no  { background: #FFF0EE; color: #A85432; border: 1px solid #F0BFB3; }

        .services { padding: 5rem 3rem; background: #F2EDE4; }
        .svc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 1rem; }
        .svc-card { background: #FDFAF5; border: 1px solid #E4DCCC; padding: 1.8rem 1.5rem; transition: border-color .2s; }
        .svc-card:hover { border-color: #B5651D; }
        .svc-icon { font-size: 1.8rem; margin-bottom: 1rem; display: block; }
        .svc-title { font-family: 'Lora', serif; font-size: 1rem; font-weight: 600; margin-bottom: .5rem; }
        .svc-desc { font-family: 'Jost', sans-serif; font-size: .82rem; color: #7A6A5A; line-height: 1.7; font-weight: 300; }

        .cta-banner { background: #1C1814; padding: 4rem 3rem; text-align: center; }
        .cta-banner h2 { font-family: 'Lora', serif; font-size: 2rem; color: #F9F6F1; margin-bottom: .8rem; }
        .cta-banner p { font-family: 'Jost', sans-serif; font-size: .92rem; color: #7A6A5A; font-weight: 300; margin-bottom: 1.8rem; }
        .email-row { display: flex; justify-content: center; gap: 0; max-width: 440px; margin: 0 auto; }
        .email-input { flex: 1; padding: .7rem 1rem; border: 1px solid #3a3530; background: #262018; color: #F9F6F1; font-family: 'Jost', sans-serif; font-size: .88rem; outline: none; }
        .email-input::placeholder { color: #5a5048; }
        .btn-sub { background: #B5651D; color: #fff; border: none; padding: .7rem 1.3rem; font-size: .8rem; font-family: 'Jost', sans-serif; letter-spacing: .1em; text-transform: uppercase; cursor: pointer; white-space: nowrap; transition: opacity .2s; }
        .btn-sub:hover { opacity: .85; }

        footer { background: #141210; color: #7A6A5A; padding: 2.5rem 3rem 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
        footer .brand { font-family: 'Lora', serif; font-size: 1.2rem; color: #F9F6F1; }
        footer .brand em { font-style: italic; color: #B5651D; }
        footer p { font-family: 'Jost', sans-serif; font-size: .78rem; font-weight: 300; }

        @media (max-width: 768px) {
          .hero { grid-template-columns: 1fr; }
          .hero-right { height: 45vw; }
          .hero-left { padding: 3rem 1.8rem; }
          .lib-nav { padding: .8rem 1.5rem; }
          .nav-links { display: none; }
          .catalogue, .services, .cta-banner { padding: 3.5rem 1.5rem; }
          footer { flex-direction: column; text-align: center; padding: 2rem 1.5rem; }
        }
      `}</style>

      {/* NAV */}
      <nav className="lib-nav">
        <div className="lib-brand"><em>Lex</em>icon Library</div>
        <ul className="nav-links">
          <li><a href="#">Catalogue</a></li>
          <li><a href="#">My Books</a></li>
          <li><a href="#">Events</a></li>
          <li><a href="#">About</a></li>
        </ul>
        <button className="btn-join">Join Free</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <p className="hero-tag">City Public Library · Est. 1948</p>
          <h1 className="hero-h1">Your next great<br/><em>story</em> starts here.</h1>
          <p className="hero-desc">Browse 120,000+ books across every genre. Borrow, explore, and discover — all free with membership.</p>
          <div className="hero-btns">
            <button className="btn-primary">Browse Books</button>
            <button className="btn-outline">Learn More</button>
          </div>
        </div>
        <div className="hero-right">
          <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=900&q=80" alt="Library shelves"/>
          <div className="hero-right-overlay"/>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat-num">{s.num}</div>
            <div className="stat-lbl">{s.label}</div>
          </div>
        ))}
      </div>

      {/* CATALOGUE */}
      <section className="catalogue">
        <p className="sec-tag">Our Collection</p>
        <h2 className="sec-title">Browse the <em>Catalogue</em></h2>

        <div className="search-wrap">
          <input
            className="search-input"
            placeholder="Search by title or author…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filters">
          {genres.map((g) => (
            <button
              key={g}
              className={`filter-pill${activeGenre === g ? " active" : ""}`}
              onClick={() => setActiveGenre(g)}
            >{g}</button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p style={{ textAlign: "center", color: "#7A6A5A", fontFamily: "'Jost',sans-serif", marginTop: "2rem" }}>No books found.</p>
        ) : (
          <div className="book-grid">
            {filtered.map((b) => (
              <div className="book-card" key={b.id}>
                <img className="book-img" src={b.img} alt={b.title}/>
                <div className="book-body">
                  <div className="book-genre-tag">{b.genre}</div>
                  <div className="book-title">{b.title}</div>
                  <div className="book-author">{b.author}</div>
                  <span className={`badge-avail ${b.available ? "badge-yes" : "badge-no"}`}>
                    {b.available ? "Available" : "Checked Out"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SERVICES */}
      <section className="services">
        <p className="sec-tag">What We Offer</p>
        <h2 className="sec-title">Library <em>Services</em></h2>
        <div className="svc-grid">
          {[
            { icon: "📚", title: "Book Lending", desc: "Borrow up to 8 books for 21 days with free renewals from any branch." },
            { icon: "📱", title: "E-Books & Audio", desc: "40,000+ digital titles available on any device, anytime." },
            { icon: "🔍", title: "Research Help", desc: "Expert librarians to assist with academic research and rare archives." },
            { icon: "🏛", title: "Reading Rooms", desc: "18 quiet rooms and a cozy lounge — open every day of the week." },
          ].map((s) => (
            <div className="svc-card" key={s.title}>
              <span className="svc-icon">{s.icon}</span>
              <div className="svc-title">{s.title}</div>
              <p className="svc-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <h2>Stay in the loop</h2>
        <p>Monthly updates on new arrivals, reading lists, and events.</p>
        <div className="email-row">
          <input className="email-input" placeholder="Your email address…" type="email"/>
          <button className="btn-sub">Subscribe</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="brand"><em>Lex</em>icon Library</div>
        <p>42 Bookbinder Lane, City Centre &nbsp;·&nbsp; +1 (800) 555-0192</p>
        <p>© 2025 Lexicon Library. All rights reserved.</p>
      </footer>
    </div>
  );
}