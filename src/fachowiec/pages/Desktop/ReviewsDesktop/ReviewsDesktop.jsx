import React, { useState } from "react";
import "./reviewsDesktop.scss";

const reviews = [
  {
    type: "video",
    src: "/assets/opinia1.mp4",
    author: "Anna K.",
    company: "Gliwice",
  },
  {
    type: "video",
    src: "/assets/opinia2.mp4",
    author: "Paweł D.",
    company: "Zabrze",
  },
  {
    type: "text",
    text: "Bardzo szybka reakcja i miła obsługa. Polecam każdemu!",
    author: "Marta",
    company: "Gliwice",
  },
  // ... kolejne opinie
];

export default function ReviewsDesktop() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? reviews.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === reviews.length - 1 ? 0 : c + 1));

  const review = reviews[current];

  return (
    <section className="reviews-section" >
        <h2 className="reviews-title">Nasi Klienci mówią:</h2>
      <div className="reviews-bg" />
      
      <div className="reviews-carousel">
        <button className="reviews-arrow" onClick={prev} aria-label="Poprzedni">
          &#60;
        </button>
        <div className="reviews-card">
          {review.type === "video" ? (
            <video
              src={review.src}
              controls
              width={240}
              height={320}
              poster="/assets/opinia-poster.jpg"
              className="reviews-video"
            />
          ) : (
            <div className="reviews-text">
              <p>{review.text}</p>
              <div className="reviews-author">
                <b>{review.author}</b>
                <span>{review.company}</span>
              </div>
            </div>
          )}
        </div>
        <button className="reviews-arrow" onClick={next} aria-label="Następny">
          &#62;
        </button>
      </div>
    </section>
  );
}
