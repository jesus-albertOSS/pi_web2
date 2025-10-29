"use client";

import BackgroundVideo from "@/components/features/BackgroundVideo";
import FAQSection from "@/components/features/FAQSection";
import Hero from "../components/ui/HeroParallaxDemo";
import React, { useState, useEffect } from "react";
import GamingCarousel from "@/components/features/GamingCarousel";
import { X, Gift, Star, Tag, Users } from "lucide-react";

type RewardDetails = {
  terms: string[];
  howToUse: string[];
  example: string;
};

type Reward = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  details: RewardDetails;
};

export default function Page() {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const rewards: Reward[] = [
    {
      title: "10% Descuento en tu Primera Compra",
      desc: "Regístrate y obtén un 10% de descuento en tu primera compra.",
      icon: <Gift className="w-8 h-8" />,
      details: {
        terms: [
          "Válido solo para nuevos usuarios",
          "Descuento aplicable en compras superiores a $20.000 COP",
          "No acumulable con otras promociones",
          "Código válido por 30 días desde el registro",
        ],
        howToUse: [
          "Regístrate en nuestra plataforma",
          "Recibirás un código de descuento por email",
          "Aplica el código en el checkout",
          "Disfruta tu descuento automáticamente",
        ],
        example: "Si compras por $100.000 COP, solo pagas $90.000 COP",
      },
    },
    {
      title: "Programa de Puntos de Fidelidad",
      desc: "Acumula puntos con cada compra y canjéalos por descuentos en futuras compras.",
      icon: <Star className="w-8 h-8" />,
      details: {
        terms: [
          "Gana 1 weCOP de descuento",
          "Los puntos no expiran mientras tu cuenta esté activa",
          "Acumulación automática en cada compra",
        ],
        howToUse: [
          "Compra cualquier producto en la tienda",
          "Tus puntos se acumulan automáticamente",
          "Revisa tu saldo en tu perfil",
          "Canjea puntos al hacer checkout",
        ],
        example:
          "Compra por $50.000 COP = 50 puntos. Al llegar a 100 puntos, obtén $5.000 COP de descuento",
      },
    },
    {
      title: "Ofertas Especiales Semanales",
      desc: "Consulta nuestras ofertas especiales cada semana y ahorra en tus juegos favoritos.",
      icon: <Tag className="w-8 h-8" />,
      details: {
        terms: [
          "Nuevas ofertas cada lunes a las 12:00 PM",
          "Descuentos de hasta 70% en juegos seleccionados",
          "Stock limitado en algunas promociones",
          "Ofertas válidas hasta agotar existencias",
        ],
        howToUse: [
          "Suscríbete a nuestro newsletter",
          "Revisa la sección de ofertas cada semana",
          "Agrega los juegos en oferta a tu carrito",
          "Completa tu compra antes que se agoten",
        ],
        example:
          "Esta semana: FIFA 25 con 40% de descuento, de $180.000 a $108.000 COP",
      },
    },
    {
      title: "Promoción de Recomendación",
      desc: "Recomienda a un amigo y recibe un cupón de descuento en tu próxima compra.",
      icon: <Users className="w-8 h-8" />,
      details: {
        terms: [
          "Tu amigo debe ser un nuevo usuario",
          "Tu amigo debe completar al menos una compra",
          "Recibirás un cupón de $10.000 COP",
          "Tu amigo también recibe $5.000 COP de descuento",
          "Sin límite de recomendaciones",
        ],
        howToUse: [
          "Obtén tu código de referido en tu perfil",
          "Comparte el código con tus amigos",
          "Tu amigo se registra con tu código",
          "Ambos reciben descuentos al completar compra",
        ],
        example: "Recomienda 5 amigos = $50.000 COP en cupones para ti",
      },
    },
  ];

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", !!selectedReward);
  }, [selectedReward]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#0a001a] text-white overflow-x-hidden">
      {/* 🌌 Fondo animado */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(157,78,221,0.15),transparent)] animate-pulse pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/textures/noise.png')] opacity-10 pointer-events-none" />

      {/* 🎬 HERO */}
    <section className="relative w-full overflow-hidden">
  <BackgroundVideo src="/videos/89894-616430996.mp4" overlay={true}>
    <Hero />
  </BackgroundVideo>
  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-600 via-purple-400 to-fuchsia-600 shadow-[0_0_20px_rgba(255,0,255,0.8)]"></div>
</section>

      {/* ⚡ División neón */}
      <div className="w-full h-1 bg-gradient-to-r from-fuchsia-600 via-purple-400 to-fuchsia-600 animate-pulse shadow-[0_0_20px_rgba(255,0,255,0.8)]" />

      {/* 🕹️ Carrusel */}
      <section className="relative w-full py-12 bg-[#0a001a] flex flex-col items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,0,211,0.15),transparent)] animate-pulse" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400 drop-shadow-[0_0_10px_rgba(255,0,255,0.6)]">
          🚀 DESTACADOS DE LA SEMANA
        </h2>
        <div className="max-w-[95%] mx-auto z-10">
          <GamingCarousel />
        </div>
      </section>

      {/* ⚡ División neón */}
      <div className="w-full h-1 bg-gradient-to-r from-purple-600 via-fuchsia-400 to-purple-600 animate-pulse shadow-[0_0_20px_rgba(200,0,255,0.8)]" />

      {/* 💎 Recompensas */}
      <section className="w-full px-6 py-16 bg-[#0a001a] relative overflow-visible">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,0,255,0.1),transparent)] pointer-events-none" />

        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 drop-shadow-[0_0_15px_rgba(255,0,255,0.7)]">
          🎮 RECOMPENSAS Y PROMOCIONES
        </h2>

        <div className="flex flex-wrap justify-center gap-10">
          {rewards.map((reward, index) => (
            <div
              key={index}
              className="bg-[#1a003a]/80 backdrop-blur-md border border-fuchsia-600/40 rounded-2xl p-6 w-[320px] sm:w-[350px] hover:scale-105 hover:shadow-[0_0_35px_#ff00ff] transition-all duration-300 hover:border-fuchsia-400 flex flex-col"
            >
              <div className="flex justify-center mb-4 text-fuchsia-400">
                {reward.icon}
              </div>
              <h3 className="text-xl font-semibold text-fuchsia-400 mb-3 text-center min-h-[56px]">
                {reward.title}
              </h3>
              <p className="text-gray-300 text-sm text-center flex-grow">
                {reward.desc}
              </p>
              <div className="mt-5 flex justify-center">
                <button
                  onClick={() => setSelectedReward(reward)}
                  className="px-5 py-2 text-sm font-bold text-white rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-700 hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-300 shadow-[0_0_20px_rgba(255,0,255,0.5)] hover:shadow-[0_0_30px_rgba(255,0,255,0.8)]"
                >
                  Ver más
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedReward && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm overflow-y-auto p-4">
          <div className="bg-[#1a003a] border-2 border-fuchsia-500/50 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(255,0,255,0.5)] animate-fade-in">
            <div className="sticky top-0 bg-gradient-to-r from-fuchsia-600 to-purple-700 p-6 flex items-center justify-between rounded-t-3xl z-50">
              <div className="flex items-center gap-4">
                <div className="text-white">{selectedReward.icon}</div>
                <h3 className="text-2xl font-bold text-white">
                  {selectedReward.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedReward(null)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-gray-300 text-lg">{selectedReward.desc}</p>

              <div className="bg-[#0a001a]/50 rounded-xl p-5 border border-fuchsia-500/30">
                <h4 className="text-fuchsia-400 font-bold text-lg mb-3 flex items-center gap-2">
                  📋 Términos y Condiciones
                </h4>
                <ul className="space-y-2">
                  {selectedReward.details.terms.map((term, idx) => (
                    <li key={idx} className="text-gray-300 flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#0a001a]/50 rounded-xl p-5 border border-purple-500/30">
                <h4 className="text-purple-400 font-bold text-lg mb-3 flex items-center gap-2">
                  🎯 ¿Cómo usar esta promoción?
                </h4>
                <ol className="space-y-2">
                  {selectedReward.details.howToUse.map((step, idx) => (
                    <li key={idx} className="text-gray-300 flex items-start gap-3">
                      <span className="text-purple-400 font-bold min-w-[24px]">
                        {idx + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-gradient-to-r from-fuchsia-900/30 to-purple-900/30 rounded-xl p-5 border border-fuchsia-400/40">
                <h4 className="text-fuchsia-300 font-bold text-lg mb-2 flex items-center gap-2">
                  💡 Ejemplo
                </h4>
                <p className="text-gray-200 italic">
                  {selectedReward.details.example}
                </p>
              </div>

              <div className="pt-4 flex justify-center">
                <button className="px-8 py-3 text-lg font-bold text-white rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-700 hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-300 shadow-[0_0_25px_rgba(255,0,255,0.6)] hover:shadow-[0_0_35px_rgba(255,0,255,0.9)] hover:scale-105">
                  ¡Activar Promoción!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ */}
      <section className="relative w-full py-1 bg-[#0a001a]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,255,0.15),transparent)] animate-pulse" />
        <FAQSection />
      </section>
    </main>
  );
}