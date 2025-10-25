"use client";
import React from "react";

export default function Hero() {
  return (
    <div className="h-screen w-full antialiased relative flex flex-col justify-center px-8 md:px-16">
      <h1 className="text-3xl md:text-7xl font-bold text-white leading-tight text-left">
        GAME <br /> CONNECT
      </h1>
      <p className="max-w-xl text-base md:text-xl mt-6 text-white text-left">
        Tu destino gaming definitivo. Ofertas épicas, entregas instantáneas y 
miles de títulos al mejor precio. Por gamers, para gamers. 🎮
      </p>
    </div>
  );
}
