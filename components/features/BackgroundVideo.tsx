"use client";

import { useEffect, useRef } from "react";

export default function BackgroundVideo({ src, overlay = true, children }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.muted = true;
      video.playsInline = true;
      video.play().catch(() => {});
    };

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setTimeout(tryPlay, 500);
      });
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
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
      </video>

      {overlay && (
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
