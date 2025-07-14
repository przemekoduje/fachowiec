import React, { useEffect, useState } from "react";
import "./diyDesktop.scss";
import { db } from "../../../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const categoryColors = {
  hydraulika: {
    base: [
      "#E5F1FB", "#D5E7F6", "#BFD8F2", "#A7C6E8", "#99BDE4", "#85ACD1", "#7397BD"
    ],
    active: "#648BB8"
  },
  elektryka: {
    base: [
      "#FFF0E6", "#FFE0CC", "#FFD3C2", "#FFC4A8", "#FFB294", "#F79F7A", "#E98C63"
    ],
    active: "#D9784C"
  },
  regulacja: {
    base: [
      "#E7F6F1", "#D3EFE6", "#BFE9DC", "#A8E0CD", "#9FC8B9", "#87B29D", "#6D9C87"
    ],
    active: "#5A8974"
  },
  montaz: { // UWAGA! bez ogonka!
    base: [
      "#FFFFFB", "#FDFBE8", "#FAF7D2", "#F8F3C9", "#F2EA9F", "#EDE67A", "#E5DC48"
    ],
    active: "#D8CE29"
  },
  "c.o.": {
    base: [
      "#F6F5FD", "#E9E3FA", "#E0DAF8", "#D9D2F6", "#C2B6EB", "#AB9CDE", "#9581D1"
    ],
    active: "#8264C6"
  },
};

function getRandomBaseColor(category) {
  const base = categoryColors[category]?.base || ["#E5F1FB"];
  const active = categoryColors[category]?.active;
  // Wyklucz "active" jeśli jest w bazie (dla pewności)
  const filtered = base.filter((col) => col !== active);
  const pool = filtered.length ? filtered : base;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Helper do CSS className:
function toClassName(cat) {
  return (cat || "hydraulika")
    .replace(/[.]/g, "-")
    .replace(/[ą]/g, "a")
    .replace(/[ż]/g, "z")
    .replace(/[ę]/g, "e")
    .replace(/[ł]/g, "l")
    .replace(/[ó]/g, "o")
    .replace(/[ń]/g, "n")
    .replace(/[ś]/g, "s")
    .replace(/[ć]/g, "c")
    .replace(/[ź]/g, "z")
    .replace(/[ś]/g, "s")
    .replace(/[^a-zA-Z0-9_-]/g, "");
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
    });
    return () => unsub();
  }, []);

  // Losowanie kolorów JEDEN RAZ przy zmianie liczby postów
  useEffect(() => {
    setTileColors(posts.map((item) => getRandomBaseColor(item.category)));
  }, [posts.length]);

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
                "diy-desktop-tile cat-" +
                toClassName(item.category) +
                (selected === idx ? " active" : "")
              }
              style={{
                background:
                  selected === idx
                    ? categoryColors[item.category]?.active || "#99BDE4"
                    : tileColors[idx],
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
