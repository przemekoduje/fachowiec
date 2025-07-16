// src/components/FAQ.jsx

import React from "react";
import faqData from "../../../dates/faqData.js";
import "./faq.scss"

export default function FAQ() {
  return (
    <section className="faq-root">
      <div className="faq-header">
        <h2>FAQ</h2>
        <div className="faq-subtitle">ważne pytania i odpowiedzi</div>
      </div>
      <div className="faq-list">
        {faqData.map((item, idx) => (
          <div className="faq-item" key={idx}>
            <div className="faq-question">{item.question}</div>
            <div
              className="faq-answer"
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
