import React, { useEffect, useState } from "react";
import EditorBlog from "../../../../EditorBlog/EditorBlog";
import { db } from "../../../../firebase"; // popraw ścieżkę do swojego firebase.js
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
// import { useRef } from "react";

export default function EditorDashboard() {
  const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState(null); // id posta, który edytujemy
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // HTML z edytora
  //   const editorRef = useRef();
  const [selectedPost, setSelectedPost] = useState(null);
  const [category, setCategory] = useState("hydraulika");

  // Real-time update postów
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "blog_posts"), (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    return () => unsub();
  }, []);

  // Dodaj nowy post
  const handleAdd = async () => {
    if (!title.trim() || !content.trim()) return;
    await addDoc(collection(db, "blog_posts"), {
      title,
      content,
      category,
      created: serverTimestamp(),
      updated: serverTimestamp(),
    });
    setTitle("");
    setContent("");
  };

  // Rozpocznij edycję
  const handleEdit = (post) => {
    setEditId(post.id);
    setTitle(post.title);
    setSelectedPost(post);
    setContent(post.content);
    setCategory(post.category || "hydraulika");
  };

  // Zapisz edycję
  const handleSaveEdit = async () => {
    if (!title.trim() || !content.trim() || !editId) return;
    await updateDoc(doc(db, "blog_posts", editId), {
      title,
      content,
      category,
      updated: serverTimestamp(),
    });
    setEditId(null);
    setTitle("");
    setContent("");
  };

  // Usuń post
  const handleDelete = async (id) => {
    if (window.confirm("Na pewno usunąć wpis?")) {
      await deleteDoc(doc(db, "blog_posts", id));
      if (editId === id) {
        setEditId(null);
        setTitle("");
        setContent("");
      }
    }
  };

  // Anuluj edycję
  const handleCancelEdit = () => {
    setEditId(null);
    setTitle("");
    setContent("");
  };

  return (
    <div
      className="editor-dashboard-root"
      style={{ maxWidth: 900, margin: "0 auto" }}
    >
      <h2 style={{ margin: "26px 0 14px" }}>Wpisy blogowe</h2>
      <table
        className="blog-table"
        style={{ width: "100%", borderCollapse: "collapse", marginBottom: 18 }}
      >
        <thead>
          <tr style={{ background: "#f4f4f4" }}>
            <th style={{ padding: 7, textAlign: "left" }}>Tytuł</th>
            <th style={{ padding: 7, textAlign: "center", width: 120 }}>Kategoria</th>

            <th style={{ padding: 7, textAlign: "center", width: 120 }}>
              Akcja
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} style={{ borderBottom: "1px solid #ececec" }}>
              <td style={{ padding: 7 }}>{post.title}</td>
              <td style={{ padding: 7, textAlign: "center" }}>{post.category}</td>

              <td style={{ padding: 7, textAlign: "center" }}>
                <button
                  style={{ marginRight: 8 }}
                  onClick={() => handleEdit(post)}
                >
                  Edytuj
                </button>
                <button onClick={() => handleDelete(post.id)}>Usuń</button>
              </td>
            </tr>
          ))}
          {posts.length === 0 && (
            <tr>
              <td
                colSpan={2}
                style={{ textAlign: "center", color: "#aaa", padding: 30 }}
              >
                Brak wpisów. Dodaj pierwszy!
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>{editId ? "Edytuj wpis" : "Nowy wpis"}</h3>
      <input
        style={{ width: "100%", padding: 8, fontSize: 18, marginBottom: 10 }}
        placeholder="Tytuł wpisu"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        style={{ width: "100%", padding: 8, fontSize: 16, marginBottom: 10 }}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="hydraulika">hydraulika</option>
        <option value="elektryka">elektryka</option>
        <option value="montaż">montaż</option>
        <option value="c.o.">c.o.</option>
        <option value="tipy domowe">tipy domowe</option>
      </select>
      <EditorBlog
        value={content}
        onChange={setContent}
        key={editId || `nowy_${posts.length}`}
      />

      <div style={{ marginTop: 14, display: "flex", gap: 12 }}>
        {editId ? (
          <>
            <button onClick={handleSaveEdit}>Zapisz edycję</button>
            <button onClick={handleCancelEdit}>Anuluj</button>
          </>
        ) : (
          <button onClick={handleAdd}>Dodaj wpis</button>
        )}
      </div>
    </div>
  );
}
