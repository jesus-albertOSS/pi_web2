"use client";
import React, { useEffect, useState } from "react";

type Recompensa = {
  titulo: string;
  descripcion: string;
};

type Evento = {
  titulo: string;
  fecha: string;
  descripcion: string;
};

export default function RecompensaPage() {
  const [recompensas, setRecompensas] = useState<Recompensa[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    setRecompensas([
      { titulo: "10% Descuento en tu Primera Compra", descripcion: "Regístrate y obtén un 10% de descuento en tu primera compra." },
      { titulo: "Programa de Puntos de Fidelidad", descripcion: "Acumula puntos con cada compra y canjéalos por recompensas." },
      { titulo: "Ofertas Especiales Semanales", descripcion: "Aprovecha descuentos y promociones especiales cada semana." },
    ]);

    setEventos([
      { titulo: "🎃 Torneo de Héroes Nocturnos", fecha: "31 de Octubre - 21:00 hrs", descripcion: "Enfréntate en un épico torneo PvP temático de Halloween. Gana puntos extra y desbloquea skins exclusivas neón." },
      { titulo: "👻 Cacería de Calabazas Digitales", fecha: "Del 28 al 31 de Octubre", descripcion: "Explora la tienda, encuentra las calabazas ocultas y gana recompensas sorpresa con cada hallazgo." },
      { titulo: "🕹️ Noche del Miedo Retro", fecha: "30 de Octubre - 19:00 hrs", descripcion: "Compite en juegos clásicos de terror y gana puntos de fidelidad dobles por tu participación." },
    ]);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#0a0b1a] via-[#0f1020] to-[#1a1c2c] text-pink-200 p-8 overflow-hidden">
      
      {/* Decoraciones */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[url('/web-corner.png')] bg-contain bg-no-repeat opacity-60 animate-pulse" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-[url('/web-corner.png')] bg-contain bg-no-repeat opacity-60 rotate-90 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[url('/web-corner.png')] bg-contain bg-no-repeat opacity-50 rotate-180 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[url('/web-corner.png')] bg-contain bg-no-repeat opacity-50 rotate-[270deg] animate-pulse" />
      <div className="absolute top-1/2 left-0 w-28 h-28 bg-[url('/web-side.png')] bg-contain bg-no-repeat opacity-40 animate-[float_6s_ease-in-out_infinite]" />
      <div className="absolute top-1/3 right-0 w-28 h-28 bg-[url('/web-side.png')] bg-contain bg-no-repeat opacity-40 animate-[float_8s_ease-in-out_infinite]" />

      {/* Araña */}
      <div className="absolute top-0 left-1/2 w-10 h-10 animate-[spider_6s_ease-in-out_infinite]">
        <div className="w-[2px] h-20 bg-gray-500 mx-auto" />
        <div className="text-4xl text-purple-500 drop-shadow-lg animate-bounce">🕷️</div>
      </div>

      {/* Bruja */}
      <div className="absolute top-20 -left-36 text-5xl animate-[witch_12s_linear_infinite] drop-shadow-[0_0_10px_#ff00ff]">🧙‍♀️</div>

      {/* Niebla */}
      <div className="absolute inset-0 bg-[url('/fog-texture.png')] bg-cover opacity-10 animate-[fog_30s_linear_infinite]" />

      {/* Encabezado */}
      <div className="border-b border-pink-500 pb-8 mb-10 text-center relative z-10">
        <h1 className="text-4xl font-extrabold text-pink-400 drop-shadow-lg animate-[flicker_2s_infinite]">🎮 Recompensas y Promociones</h1>
        <p className="mt-4 text-pink-200 text-lg max-w-2xl mx-auto">Descubre nuestras recompensas exclusivas y promociones semanales. ¡Canjea y ahorra en tus juegos favoritos!</p>
      </div>

      {/* Recompensas */}
      <div className="bg-[#15172b]/70 border border-pink-500/70 rounded-2xl p-8 shadow-lg backdrop-blur-md relative z-10">
        <h2 className="text-3xl font-bold text-center text-pink-400 drop-shadow-lg mb-8">💎 Beneficios Exclusivos</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {recompensas.map((r, idx) => (
            <div key={idx} className="border border-pink-400/60 rounded-xl bg-[#1a1c2c]/90 p-6 shadow-md hover:shadow-lg hover:border-pink-300 transition-all duration-300 animate-[float_4s_ease-in-out_infinite]">
              <h3 className="text-2xl font-semibold text-pink-300 drop-shadow-sm mb-3">{r.titulo}</h3>
              <p className="text-pink-100">{r.descripcion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Separador */}
      <div className="my-16 flex items-center justify-center relative z-10">
        <div className="h-[2px] w-3/4 bg-gradient-to-r from-transparent via-pink-500 to-transparent shadow-md" />
      </div>

      {/* Eventos */}
      <div className="bg-[#15172b]/70 border border-purple-500/70 rounded-2xl p-8 shadow-lg relative z-10">
        <h2 className="text-3xl font-extrabold text-center text-purple-400 drop-shadow-lg">👾 Eventos Gaming de Halloween 🎃</h2>
        <p className="mt-4 text-center text-pink-200 text-lg max-w-3xl mx-auto">Este Halloween, participa en nuestros eventos especiales y gana puntos, skins exclusivas y recompensas épicas. ¡Demuestra quién manda en la arena digital!</p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {eventos.map((e, idx) => (
            <div key={idx} className="border border-purple-400/60 rounded-xl bg-[#1a1c2c]/90 p-6 text-pink-200 shadow-md hover:shadow-lg hover:border-purple-300 transition-all duration-300 animate-[float_5s_ease-in-out_infinite]">
              <h3 className="text-2xl font-semibold text-purple-300 drop-shadow-sm mb-2">{e.titulo}</h3>
              <p className="text-sm text-pink-200 italic mb-3">{e.fecha}</p>
              <p className="text-pink-100">{e.descripcion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Calabazas */}
      <div className="absolute bottom-10 left-10 text-4xl animate-[pumpkin_6s_ease-in-out_infinite]">🎃</div>
      <div className="absolute bottom-16 right-16 text-4xl animate-[pumpkin_7s_ease-in-out_infinite]">🎃</div>
      <div className="absolute top-1/4 left-20 text-4xl animate-[pumpkin_8s_ease-in-out_infinite]">🎃</div>
      <div className="absolute top-1/3 right-24 text-4xl animate-[pumpkin_9s_ease-in-out_infinite]">🎃</div>
      <div className="absolute bottom-1/3 left-1/2 text-5xl animate-[pumpkin_10s_ease-in-out_infinite]">🎃</div>
    </section>
  );
}
