import React from "react";
import "./reactbits.css";

export default function FluidGlassCard({ title, subtitle, children }) {
  return (
    <div className="rb-glass-card">
      {(title || subtitle) && (
        <div className="rb-glass-head">
          {title && <h3 className="rb-glass-title">{title}</h3>}
          {subtitle && <p className="rb-glass-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="rb-glass-body">{children}</div>
    </div>
  );
}
