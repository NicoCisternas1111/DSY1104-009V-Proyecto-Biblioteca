import React, { useRef } from "react";
import "./reactbits.css";

export default function Magnet({ strength = 25, children }) {
  const ref = useRef(null);
  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${(relX / rect.width) * strength}px, ${(relY / rect.height) * strength}px)`;
  }
  function reset() {
    const el = ref.current;
    if (el) el.style.transform = "translate(0,0)";
  }
  return (
    <span className="rb-magnet-wrap" onMouseMove={onMove} onMouseLeave={reset}>
      <span ref={ref} className="rb-magnet-inner">
        {children}
      </span>
    </span>
  );
}
