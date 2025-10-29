"use client";

import React, { ReactNode } from "react";

interface BackgroundVideoProps {
  src: string;
  overlay?: boolean;
  children?: ReactNode;
}

export default function BackgroundVideo({ src, overlay = true, children }: BackgroundVideoProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={src} type="video/mp4" />
      </video>

      {overlay && <div className="absolute inset-0 bg-black/40 pointer-events-none" />}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
