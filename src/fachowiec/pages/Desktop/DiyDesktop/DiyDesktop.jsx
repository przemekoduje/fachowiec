import React, { useEffect, useState } from "react";
import "./diyDesktop.scss";
import { db } from "../../../../firebase"; // dopasuj ścieżkę!
import { collection, onSnapshot } from "firebase/firestore";

const categoryColors = {
  hydraulika: [
    "#E5F1FB",
    "#D5E7F6",
    "#BFD8F2",
    "#A7C6E8",
    "#99BDE4",
    "#85ACD1",
    "#7397BD",
    "#648BB8",
  ],
  elektryka: [
    "#FFF0E6",
    "#FFE0CC",
    "#FFD3C2",
    "#FFC4A8",
    "#FFB294",
    "#F79F7A",
    "#E98C63",
    "#D9784C",
  ],
  regulacja: [
    "#E7F6F1",
    "#D3EFE6",
    "#BFE9DC",
    "#A8E0CD",
    "#9FC8B9",
    "#87B29D",
    "#6D9C87",
    "#5A8974",
  ],
  montaż: [
    "#FFFFFB",
    "#FDFBE8",
    "#FAF7D2",
    "#F8F3C9",
    "#F2EA9F",
    "#EDE67A",
    "#E5DC48",
    "#D8CE29",
  ],
  "c.o.": [
    "#F6F5FD",
    "#E9E3FA",
    "#E0DAF8",
    "#D9D2F6",
    "#C2B6EB",
    "#AB9CDE",
    "#9581D1",
    "#8264C6",
  ],
};

function getRandomColor(category) {
  const colors = categoryColors[category] || ["#E5F1FB"];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function DIY() {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(0);
  const [tileColors, setTileColors] = useState([]);

  useEffect(() => {
  const unsub = onSnapshot(collection(db, "blog_posts"), (snapshot) => {
    const newPosts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(newPosts);

    // Losowanie kolorów tylko raz dla pobranych postów
    setTileColors(
      newPosts.map((item) => getRandomColor(item.category))
    );
  });
  return () => unsub();
}, []);

  // Jeżeli nie ma żadnych wpisów
  if (posts.length === 0) return <div>Brak porad DIY do wyświetlenia.</div>;

  return (
    <section className="diy-desktop-root" id="diy">
      <div className="diy-desktop-header">
        <h2>DIY</h2>
        <div className="diy-desktop-subtitle">zrób to sam</div>
      </div>
      <div className="diy-desktop-cols">
        <div className="diy-desktop-tiles">
          {posts.map((item, idx) => (
            <div
              key={item.id}
              className={
                "diy-desktop-tile" + (selected === idx ? " active" : "")
              }
              style={{
                background: tileColors[idx],
                cursor: selected === idx ? "default" : "pointer",
              }}
              onClick={() => setSelected(idx)}
            >
              <span className="diy-desktop-tile-title">{item.title}</span>
            </div>
          ))}
        </div>
        <div className="diy-desktop-detail">
          <div className="diy-desktop-detail-title">
            {posts[selected]?.title}
          </div>
          <span className="diy-desktop-tile-intro">
            {posts[selected]?.intro || ""}
          </span>
          <div className="diy-desktop-detail-content">
            <div
              dangerouslySetInnerHTML={{
                __html: posts[selected]?.content || "",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
