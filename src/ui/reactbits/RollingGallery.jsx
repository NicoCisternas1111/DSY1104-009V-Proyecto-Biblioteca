import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import "./reactbits.css";

export default function RollingGallery({
  images = [],
  items = [],
  clickable = false,
  toFn = (item) => `/libro/${item.id}`,
  height = 260,
  gap = 24,
  // speed = segundos que tarda en dar una vuelta completa
  speed = 40,
  // lo dejamos en false para que NUNCA se pause al pasar el mouse
  pauseOnHover = false,
  mask = true,
  aspect = 0.6667,
  className = "",
}) {
  const pxHeight = typeof height === "number" ? `${height}px` : height;

  // Base de datos de imágenes: o items (libros) o images (urls sueltas)
  const base = (items?.length
    ? items
    : images?.map((src, i) => ({ id: i, image: src })) ?? []
  ).filter((it) => it && it.image); // ignoramos los que no tienen imagen

  // Duplicamos la lista para que el loop sea contínuo
  const loop = useMemo(() => {
    if (!base.length) return [];
    return [...base, ...base];
  }, [base]);

  if (!base.length) return null;

  return (
    <div
      className={[
        "rb-rolling-wrap",
        mask ? "rb-rolling-mask" : "",
        className,
      ]
        .join(" ")
        .trim()}
      style={{
        "--rb-gap": `${gap}px`,
        "--rb-height": pxHeight,
        "--rb-aspect": aspect,
      }}
    >
      <div
        className={[
          "rb-rolling-track",
          pauseOnHover ? "rb-rolling-pauseable" : "",
        ]
          .join(" ")
          .trim()}
        style={{ "--rb-speed": `${speed}s` }}
        aria-label="Galería de portadas"
      >
        {loop.map((it, i) => {
          const img = <img src={it.image} alt={`Portada ${i + 1}`} />;
          return (
            <div className="rb-rolling-item" key={`${it.id ?? i}-${it.image}`}>
              {clickable && it.id != null ? (
                <Link
                  to={toFn(it)}
                  className="rb-rolling-link"
                  aria-label={`Ver detalle del libro ${it.id}`}
                >
                  {img}
                </Link>
              ) : (
                img
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
