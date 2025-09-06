export default function AboutPage() {
  return (
    <div className="p-8 max-w-[1000px] mx-auto font-sans">
      {/* Sección con imagen de fondo y texto encima */}
      <section
        className="text-center py-20 px-4 rounded-lg mb-12 flex flex-col items-center justify-center min-h-[270px] relative"
        style={{
          backgroundImage: "url('/images/img/cubismo.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 text-white max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold">Sobre Nosotros</h1>
          <p className="text-lg">
            En{" "}
            <span className="font-bold text-yellow-400">ARTTHÉA</span> nos apasiona el arte y la
            tecnología. Nuestra misión es conectar artistas con el público a través de experiencias
            visuales únicas y accesibles.
          </p>
        </div>
      </section>

      {/* Contenido con Historia y Equipo */}
      <div className="flex flex-col gap-8 bg-gradient-to-br from-[#fffbe6] to-[#ffe082] p-8 rounded-lg shadow-lg text-black">
        {/* Historia */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Nuestra Historia</h2>
          <p className="leading-relaxed">
            ARTTHÉA nació como un proyecto que combina creatividad y tecnología para ofrecer una
            plataforma donde los artistas puedan mostrar sus obras, recibir retroalimentación y
            encontrar nuevas oportunidades.
          </p>
        </div>

        {/* Equipo */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Nuestro Equipo</h2>
          <p className="leading-relaxed">
            Somos un grupo multidisciplinario apasionado por el arte, el diseño y la tecnología.
            Creemos que la colaboración y la innovación son la clave para construir el futuro.
          </p>
        </div>
      </div>
    </div>
  );
}
