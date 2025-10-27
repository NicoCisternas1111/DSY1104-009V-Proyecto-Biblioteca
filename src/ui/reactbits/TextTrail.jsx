import React from "react";
import "./reactbits.css";

export default function TextTrail({ text = "BibliotecaDuoc", gap = 0.12, delay = 0.04 }) {
  const chars = Array.from(text);
  return (
    <h1 className="rb-text-trail" aria-label={text}>
      {chars.map((c, i) => (
        <span
          key={i}
          style={{ animationDelay: `${i * delay}s`, marginLeft: c === " " ? "0.25em" : 0 }}
          className="rb-text-trail-char"
        >
          {c}
        </span>
      ))}
    </h1>
  );
}
