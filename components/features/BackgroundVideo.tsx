// src/components/BackgroundVideo.jsx
"use client";

export default function BackgroundVideo({ src, overlay = true, children }) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 🎥 Video de fondo */}
      <video
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
