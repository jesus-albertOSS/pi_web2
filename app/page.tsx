"use client";
import React, { useState } from "react";
import Image from "next/image";

import "./globals.css";

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-2xl overflow-hidden shadow-[0_2px_8px_0_rgba(220,188,12,0.06)] transition-shadow duration-200 ${
        open
          ? "shadow-[0_4px_16px_0_rgba(220,188,12,0.13)] bg-gradient-to-br from-[#fffbe6] to-[#a7945c]"
          : "bg-gradient-to-br from-[#fffbe6] to-[#ffe082]"
      }`}
    >
      <button
        className="w-full bg-none border-none outline-none text-left p-4 sm:p-5 text-lg font-semibold text-[#9c7905] cursor-pointer flex justify-between items-center transition-background duration-200 hover:bg-gradient-to-br hover:from-[#fffbe6] hover:to-[#866b1a]"
        onClick={() => setOpen(!open)}
      >
        {question}
        <span
          className={`text-lg ml-3 transition-colors duration-200 ${
            open ? "text-white" : "text-black"
          }`}
        >
          {open ? "▲" : "▼"}
        </span>
      </button>
      {open && (
        <div className="p-4 sm:px-5 text-[#444] text-base animate-fadeInFaq">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <>
      <main className="flex justify-center items-center p-8 sm:p-16 min-h-[calc(100vh-80px)] bg-[#fdf7f5] font-georgia">
        <div className="flex flex-col md:flex-row gap-8 sm:gap-16 max-w-6xl w-full items-center justify-center text-center md:text-left flex-wrap">
          <div className="flex-1 max-w-lg">
            <h1 className="text-4xl sm:text-5xl text-black mb-4">
              Bienvenido a{" "}
              <span className="font-bold italic text-[#9c7905]">
                <span className="text-black">AR</span>
                <span className="text-[#408f40]">T</span>
                <span className="text-[#dfbc0c]">HEA</span>
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-black mt-2">
              Explora el arte como nunca antes.
            </p>
            <button className="bg-[#d8c40c] text-white px-4 py-2 border-none rounded-2xl cursor-pointer font-semibold text-lg transition-colors duration-300 hover:bg-[#9c7905] mt-4">
              Hazte miembro
            </button>
          </div>

          <div className="flex-1 flex justify-center items-center">
            <Image
              src="/images/img/flores-amarillas.jpg"
              alt="Arte de flores amarillas"
              width={300}
              height={300}
              className="w-3/5 h-auto object-contain"
              priority
            />
          </div>
        </div>
      </main>

      <hr />

      <section
        className="p-8 sm:p-16 text-center relative flex flex-col items-center justify-center min-h-[200px]"
        style={{
          backgroundImage: "url('/images/img/pinturaPasto.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 w-full">
          <h2 className="text-3xl sm:text-4xl text-white mb-4 drop-shadow-lg">
            Crea tu portafolio artístico
          </h2>
          <p className="text-xl sm:text-2xl text-white mb-6 drop-shadow-lg">
            Muestra tus obras y conecta con otros artistas.
          </p>
          <button className="bg-[#d8c40c] text-white px-4 py-2 border-none rounded-2xl cursor-pointer font-semibold text-lg transition-colors duration-300 hover:bg-[#9c7905]">
            Publica tu primera obra
          </button>
        </div>
      </section>

      <div className="w-full mx-auto my-12 max-w-6xl bg-gradient-to-br from-[#fffbe6] to-[#ffe082] rounded-[32px] shadow-lg shadow-gray-400/30 p-10 relative z-10">
        <h2 className="text-3xl sm:text-4xl text-[#333] mb-8 text-center font-bold">
          Ayudando a la comunidad artística global
        </h2>
        <div className="flex flex-col md:flex-row justify-between gap-8 mt-6">
          <div className="flex-1 flex flex-col gap-8">
            <div className="bg-white rounded-[18px] shadow-md shadow-gray-400/20 p-8 transition-transform duration-300 transform hover:translate-y-[-8px] hover:scale-103 hover:shadow-xl hover:shadow-gray-400/30">
              <h4 className="text-xl font-bold text-[#9c7905] tracking-wider mb-2">
                Apoyo a artistas emergentes
              </h4>
              <p className="text-[#444] text-lg leading-relaxed">
                ARTTHÉA es una plataforma que conecta artistas y amantes del
                arte de todo el mundo. Únete a nosotros para compartir,
                descubrir y celebrar el arte.
              </p>
            </div>
            <div className="bg-white rounded-[18px] shadow-md shadow-gray-400/20 p-8 transition-transform duration-300 transform hover:translate-y-[-8px] hover:scale-103 hover:shadow-xl hover:shadow-gray-400/30">
              <h4 className="text-xl font-bold text-[#9c7905] tracking-wider mb-2">
                Impacto social
              </h4>
              <p className="text-[#444] text-lg leading-relaxed">
                Nuestro compromiso es apoyar a artistas emergentes y promover la
                diversidad cultural. Creemos en el poder del arte para
                transformar comunidades y crear un mundo más inclusivo.
              </p>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-8">
            <div className="bg-white rounded-[18px] shadow-md shadow-gray-400/20 p-8 transition-transform duration-300 transform hover:translate-y-[-8px] hover:scale-103 hover:shadow-xl hover:shadow-gray-400/30">
              <h4 className="text-xl font-bold text-[#9c7905] tracking-wider mb-2">
                Promoción de arte
              </h4>
              <p className="text-[#444] text-lg leading-relaxed">
                Creemos en la importancia de dar visibilidad a los artistas y
                sus obras. A través de nuestras iniciativas, buscamos promover
                el arte en todas sus formas y conectar a los creadores con un
                público más amplio.
              </p>
            </div>
            <div className="bg-white rounded-[18px] shadow-md shadow-gray-400/20 p-8 transition-transform duration-300 transform hover:translate-y-[-8px] hover:scale-103 hover:shadow-xl hover:shadow-gray-400/30">
              <h4 className="text-xl font-bold text-[#9c7905] tracking-wider mb-2">
                Subastas de arte
              </h4>
              <p className="text-[#444] text-lg leading-relaxed">
                Nuestras subastas de arte ofrecen a los artistas una plataforma
                para vender sus obras y obtener reconocimiento. Apoyamos a los
                creadores en cada paso del proceso.
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <section className="max-w-6xl mx-auto my-12 p-10 bg-white rounded-3xl shadow-lg shadow-gray-400/20">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1 flex items-start justify-center text-center md:text-left">
            <div>
              <h2 className="text-3xl sm:text-4xl text-[#333] mb-6 font-bold">
                Preguntas frecuentes
              </h2>
              <h5 className="text-lg sm:text-xl text-[#444] font-medium leading-relaxed">
                Nuestra comunidad artística es una plataforma social para
                artistas que desean compartir, publicar y debatir sobre arte y
                obras creativas. Es gratuita y solo necesitas registrar tu
                correo electrónico para crear tu perfil.
              </h5>
            </div>
          </div>
          <div className="flex-1.2 flex flex-col gap-5">
            <FAQItem
              question="¿Cómo puedo unirme a ARTTHÉA?"
              answer="Puedes unirte a ARTTHÉA creando una cuenta gratuita en nuestra plataforma. Una vez registrado, podrás explorar, compartir y vender tus obras de arte."
            />
            <FAQItem
              question="¿Puedo vender mis obras en ARTTHÉA?"
              answer="Sí, puedes publicar y vender tus obras de arte a través de nuestra plataforma de manera sencilla y segura."
            />
            <FAQItem
              question="¿Hay algún costo para los artistas?"
              answer="Registrarse y crear un portafolio es gratuito. Solo se aplican comisiones cuando vendes una obra."
            />
            <FAQItem
              question="¿Cómo puedo participar en las subastas?"
              answer="Para participar en las subastas, solo necesitas tener una cuenta activa y seguir las instrucciones en la sección de subastas."
            />
          </div>
        </div>
      </section>
    </>
  );
}
