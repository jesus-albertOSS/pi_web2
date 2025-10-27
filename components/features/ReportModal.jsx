import React, { useState, useEffect } from "react";
import { FaChartPie } from "react-icons/fa";

const ReportModal = () => {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 🔐 Verificar si el usuario activo tiene name = "michel"
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.name?.toLowerCase() === "michel") {
          setIsVisible(true);
        }
      } catch (err) {
        console.error("Error leyendo usuario del localStorage:", err);
      }
    }
  }, []);

  if (!isVisible) return null; // No renderiza nada si no es Michel

  return (
    <div className="flex justify-center">
      {/* 🔘 Botón más pequeño y moderno */}
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-purple-500/40 transition-all flex items-center gap-2 text-sm md:text-base"
      >
        <FaChartPie className="text-lg" />
        Ver Reporte
      </button>

      {/* 💠 Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0a0a0f] border border-purple-600 rounded-2xl shadow-lg w-[90%] h-[85%] overflow-hidden relative">
            {/* Botón cerrar */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-4 text-purple-400 text-xl hover:text-white transition"
            >
              ✕
            </button>

            {/* Contenido del reporte */}
            <iframe
              src="http://127.0.0.1:8000/report"
              title="Reporte GameConnect"
              className="w-full h-full border-none rounded-xl"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportModal;
