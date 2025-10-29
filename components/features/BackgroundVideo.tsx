"use client";

import { useEffect, useRef } from "react";

export default function BackgroundVideo({ src, overlay = true, children }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Aseguramos que esté silenciado y reproduzca inline
    video.muted = true;
    video.playsInline = true;

    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Retry en móviles si no se reproduce automáticamente
          setTimeout(playVideo, 500);
        });
      }
    };

    playVideo();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video de fondo */}
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
        poster="/textures/video-placeholder.png" // fallback para móviles lentos
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Overlay opcional */}
      {overlay && (
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      )}

      {/* Contenido sobre el video */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
