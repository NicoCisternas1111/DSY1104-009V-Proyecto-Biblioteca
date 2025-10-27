import React, { useEffect, useState } from "react";
import "./reactbits.css";

export default function RotatingText({ items = [], interval = 2000, className = "" }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!items.length) return;
    const id = setInterval(() => setIndex(i => (i + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [items, interval]);
  if (!items.length) return null;
  return (
    <span className={`rb-rotating ${className}`}>
      <span key={index} className="rb-rotating-item">
        {items[index]}
      </span>
    </span>
  );
}
