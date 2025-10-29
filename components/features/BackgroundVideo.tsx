"use client";

import { useEffect, useRef } from "react";

export default function BackgroundVideo({ src, overlay = true, children }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const playPromise = video.play();

      // Safari y algunos Android bloquean autoplay: lo forzamos
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // ✅ Reproducción automática exitosa
          })
          .catch(() => {
            // ❌ Si falla, intentamos reintentar después de un breve delay
            const tryPlay = () => {
              video.muted = true;
              video.playsInline = true;
              video.play().catch(() => {});
            };

            // algunos móviles necesitan un pequeño delay
            setTimeout(tryPlay, 500);
          });
      }
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 🎥 Video de fondo */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        preload="auto"
        disablePictureInPicture
      >
        <source src={src} type="video/mp4" />
        Tu navegador no soporta el video en HTML5.
      </video>

      {/* 🩶 Capa oscura opcional */}
      {overlay && (
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      )}

      {/* 🧩 Contenido sobre el video */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
