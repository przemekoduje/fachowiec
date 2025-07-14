import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Blockquote from "@tiptap/extension-blockquote";
import TextAlign from "@tiptap/extension-text-align";

import "./editorBlog.scss";
import { useRef } from "react";
import { useState } from "react";

export default function EditorBlog({ value, onChange }) {
  const [customClass, setCustomClass] = useState("");
  const [imageMode, setImageMode] = useState(null);
  const CustomImage = Image.extend({
    addAttributes() {
      return {
        ...this.parent?.(),
        width: { default: null },
        customClass: { default: null },
        align: { default: null },
        caption: { default: null },
      };
    },
    renderHTML({ HTMLAttributes }) {
      // Przykład: szerokość z atrybutu, customClass jako klasa
      return [
        "img",
        {
          ...HTMLAttributes,
          class: HTMLAttributes.customClass || "",
          style: `width: ${HTMLAttributes.width || "150px"};`,
        },
      ];
    },
  });
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      CustomImage,
      Link,
      Blockquote,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      if (onChange) onChange(editor.getHTML());
    },
  });

  const fileInputRef = useRef();
  const [showImageModal, setShowImageModal] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  // Zamknij modal i wyczyść pola
  const closeImageModal = () => {
    setShowImageModal(false);
    setImgUrl("");
    setCustomClass("");
    setImageMode(null);
  };

  const handleInsertImageFromUrl = () => {
    if (imgUrl) {
      editor
        .chain()
        .focus()
        .setImage({ src: imgUrl, customClass: customClass || "" })
        .run();
      setImgUrl("");
      setCustomClass(""); // wyczyść po wstawieniu
      setShowImageModal(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      editor
        .chain()
        .focus()
        .setImage({ src: ev.target.result, customClass: customClass || "" })
        .run();
      setCustomClass(""); // opcjonalnie, jeśli chcesz czyścić po uploadzie
      setShowImageModal(false);
    };
    reader.readAsDataURL(file);
    e.target.value = null; // reset file input
  };

  if (!editor) return <div>Ładowanie edytora...</div>;

  // Możesz dołożyć własne buttony narzędziowe poniżej
  return (
    <div className="editor-blog-root">
      <div className="editor-toolbar-sticky">
        <div className="editor-toolbar">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "active" : ""}
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "active" : ""}
          >
            I
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "active" : ""}
          >
            U
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "active" : ""}
          >
            • Lista
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "active" : ""}
          >
            1. Lista
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "active" : ""}
          >
            " Cytat
          </button>
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive("paragraph") ? "active" : ""}
          >
            ¶
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={editor.isActive("heading", { level: 2 }) ? "active" : ""}
          >
            H2
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={editor.isActive("heading", { level: 3 }) ? "active" : ""}
          >
            H3
          </button>

          <button
            type="button"
            onClick={() => {
              setImageMode("url");
              setShowImageModal(true);
            }}
            className="toolbar-btn image"
          >
            🖼️ Z linku
          </button>
          <button
            type="button"
            onClick={() => {
              setImageMode("file");
              setShowImageModal(true);
            }}
            className="toolbar-btn image"
          >
            📁 Z pliku
          </button>

          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          <button
            onClick={() => {
              const url = window.prompt("Podaj link");
              if (url) editor.chain().focus().toggleLink({ href: url }).run();
            }}
          >
            🔗 Link
          </button>
          <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
            Wyczyść style
          </button>
        </div>
      </div>
      {showImageModal && (
        <div className="editor-modal-backdrop">
          <div className="editor-modal">
            <div className="editor-modal-title">
              Dodaj obrazek {imageMode === "url" ? "z linku" : "z pliku"}
            </div>

            <input
              type="text"
              placeholder="Nazwa klasy CSS (opcjonalnie)"
              value={customClass}
              onChange={(e) => setCustomClass(e.target.value)}
              style={{ marginBottom: 6 }}
              autoFocus
            />

            {imageMode === "url" ? (
              <>
                <input
                  type="text"
                  placeholder="Wklej adres obrazka (URL)"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  style={{ marginBottom: 8 }}
                />
                <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                  <button onClick={handleInsertImageFromUrl} disabled={!imgUrl}>
                    Dodaj
                  </button>
                  <button onClick={closeImageModal}>Anuluj</button>
                </div>
              </>
            ) : (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ marginBottom: 8 }}
                />
                <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                  <button onClick={closeImageModal}>Anuluj</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="editor-blog-content-scroll">
        <EditorContent editor={editor} className="editor-blog-content" />
      </div>
    </div>
  );
}
