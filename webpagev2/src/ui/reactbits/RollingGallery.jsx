import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import "./reactbits.css";

/**
 * RollingGallery — galería horizontal continua (clickeable opcional).
 *
 * Usos:
 *  A) Con imágenes (compat retro):
 *     <RollingGallery images={['/a.jpg','/b.jpg']} />
 *
 *  B) Con items { id, image } y links automáticos a /libro/:id:
 *     <RollingGallery items={[{id:'123', image:'/a.jpg'}]} clickable />
 *
 * Props:
 *  - images: string[]  (solo imágenes)
 *  - items:  {id:any, image:string}[]  (recomendado para enlaces)
 *  - clickable: boolean (si true y hay id, envuelve en <Link>)
 *  - toFn: (item) => string   (ruta custom; por defecto `/libro/${item.id}`)
 *  - height: number|string (alto del marco)              [default 260]
 *  - gap: number (px entre ítems)                        [default 24]
 *  - speed: number (segundos por vuelta completa)        [default 25]
 *  - pauseOnHover: boolean (pausa al hover)              [default true]
 *  - mask: boolean (gradiente en bordes)                 [default true]
 *  - aspect: number (ancho/alto; 2:3 ≈ 0.6667)          [default 0.6667]
 *  - className: string (clases extra en el wrapper)
 */
export default function RollingGallery({
  images = [],
  items = [],
  clickable = false,
  toFn = (item) => `/libro/${item.id}`,
  height = 260,
  gap = 24,
  speed = 25,
  pauseOnHover = true,
  mask = true,
  aspect = 0.6667,
  className = "",
}) {
  const pxHeight = typeof height === "number" ? `${height}px` : height;

  // Normaliza data: prioriza "items"; si no, mapea "images"
  const base = items?.length
    ? items
    : images?.map((src, i) => ({ id: i, image: src })) ?? [];

  // Duplicamos para loop continuo
  const loop = useMemo(() => [...base, ...base], [base]);

  if (!base.length) return null;

  return (
    <div
      className={[
        "rb-rolling-wrap",
        mask ? "rb-rolling-mask" : "",
        className,
      ].join(" ").trim()}
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
        ].join(" ").trim()}
        style={{ "--rb-speed": `${speed}s` }}
        aria-label="Galería de portadas"
      >
        {loop.map((it, i) => {
          const img = (
            <img src={it.image} alt={`Portada ${i + 1}`} />
          );
          return (
            <div className="rb-rolling-item" key={`${i}-${it.image}`}>
              {clickable && it.id != null ? (
                <Link to={toFn(it)} className="rb-rolling-link" aria-label={`Ver detalle del libro ${it.id}`}>
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