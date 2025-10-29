"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { supabase } from "../../supabase/client";
import { useCart } from "../../context/CartContext";

type Product = {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  feature?: string;
  features?: string[];
  tematica?: string;
  description?: string;
};

export default function GamingCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart } = useCart();

  const filters = ["Todos", "Acción", "Aventura", "RPG", "Estrategia", "Simulación", "Deportes"];

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, price, image_url, feature, tematica, description");

      if (error) {
        console.error("Error al cargar productos:", error);
        return;
      }

      const formatted = (data || []).map((p) => ({
        ...p,
        features: p.feature ? [p.feature] : [],
      }));

      setProducts(formatted);
    };

    fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      selectedFilter === "Todos" ||
      p.tematica?.toLowerCase() === selectedFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.canScrollPrev() ? emblaApi.scrollPrev() : emblaApi.scrollTo(filtered.length - 1);
  }, [emblaApi, filtered.length]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.canScrollNext() ? emblaApi.scrollNext() : emblaApi.scrollTo(0);
  }, [emblaApi]);

  const handleAddToCart = (p: Product) => {
    addToCart({
      id: p.id,
      name: p.name,
      price: p.price,
      image_url: p.image_url,
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 1500);
  };

  return (
    <>
      <div className="relative w-full bg-gradient-to-b from-[#1e003e] to-[#3b007a] text-white px-6 py-10 rounded-3xl shadow-lg overflow-visible">
        {/* 🔍 Buscador y filtros */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 flex-wrap mt-2 pt-4">
          <div className="relative w-full md:w-72 flex-shrink-0">
            <input
              type="text"
              placeholder="Buscar producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#2a0057] text-sm rounded-xl py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="flex gap-2 flex-wrap justify-center md:justify-end">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedFilter === filter
                    ? "bg-pink-600 text-white shadow-md"
                    : "bg-[#2a0057] text-gray-300 hover:bg-pink-700 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* 🎮 Carrusel */}
        <div className="relative">
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-[#2a0057]/80 hover:bg-pink-700 text-white p-3 rounded-full shadow-md transition-all hover:scale-110 border border-pink-500"
          >
            <FaChevronLeft size={20} />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-[#2a0057]/80 hover:bg-pink-700 text-white p-3 rounded-full shadow-md transition-all hover:scale-110 border border-pink-500"
          >
            <FaChevronRight size={20} />
          </button>

          <div ref={emblaRef} className="overflow-x-hidden px-6 py-8">
            <div className="flex gap-8 items-center">
              {filtered.map((p) => (
                <motion.div
                  key={p.id}
                  whileHover={{ scale: 1.05, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="min-w-[320px] sm:min-w-[400px] md:min-w-[440px] relative rounded-2xl shadow-lg overflow-hidden 
                            border border-transparent bg-gradient-to-br from-[#5e00a6] via-[#9a00ff] to-[#ff00b8]
                            p-[2px] hover:shadow-pink-500/50 transition-transform duration-300 group"
                >
                  <div className="relative rounded-2xl bg-[#100024] overflow-hidden">
                    {p.feature && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-600 to-purple-600 text-xs font-semibold px-3 py-1 rounded-full shadow-md z-20">
                        {p.feature}
                      </div>
                    )}

                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-100 transition-all duration-300 blur-[1px] group-hover:blur-0"
                      style={{
                        backgroundImage: p.image_url
                          ? `url(${p.image_url})`
                          : "linear-gradient(135deg, #3b007a, #1e003e)",
                      }}
                    ></div>

                    <div className="relative z-10 flex flex-col justify-end items-center p-8 bg-black/40 backdrop-blur-sm h-full rounded-2xl">
                      <h3 className="text-xl font-bold text-center drop-shadow-md mb-2">
                        {p.name}
                      </h3>
                      <p className="text-lg font-semibold text-pink-400 mb-4">
                        ${p.price.toFixed(2)}
                      </p>

                      <div className="flex gap-4">
                        <button
                          onClick={() => setSelectedProduct(p)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-medium shadow-md hover:shadow-cyan-400/40 transition-all"
                        >
                          Visualizar
                        </button>
                        <button
                          onClick={() => handleAddToCart(p)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-800 to-pink-700 hover:from-purple-700 hover:to-pink-600 text-white font-medium shadow-md hover:shadow-pink-500/40 transition-all"
                        >
                          Añadir
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ⚡ Notificación */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] 
                     bg-gradient-to-r from-cyan-600 via-blue-700 to-purple-700
                     px-6 py-2 rounded-xl text-white text-sm sm:text-base font-semibold
                     shadow-lg border border-cyan-400/30
                     flex items-center justify-center space-x-2 sm:space-x-3"
          >
            <span>⚡ Producto añadido ⚡</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 💫 Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-[0_0_40px_#00eaff80] 
                         border border-cyan-500/40 bg-[#000000cc] max-h-[90vh] overflow-y-auto 
                         scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="absolute inset-0 bg-cover bg-center blur-sm brightness-[0.3]"
                style={{
                  backgroundImage: selectedProduct.image_url
                    ? `url(${selectedProduct.image_url})`
                    : "linear-gradient(135deg, #001d3d, #003566)",
                }}
              ></div>

              <div className="absolute inset-0 bg-gradient-to-br from-cyan-800/20 via-blue-900/30 to-[#001122]/70"></div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-6 p-6 sm:p-8">
                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex justify-center"
                >
                  <div className="relative w-full max-w-[320px] sm:max-w-[360px]">
                    <img
                      src={selectedProduct.image_url}
                      alt={selectedProduct.name}
                      className="rounded-2xl w-full h-auto object-cover shadow-[0_0_30px_#00eaff80] border border-cyan-500/40"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-cyan-500/10 animate-pulse"></div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col text-center md:text-left space-y-4"
                >
                  <motion.h2
                    className="text-3xl sm:text-4xl font-extrabold text-cyan-400 drop-shadow-[0_0_15px_#00eaff]"
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    ✨ GAMING ✨
                  </motion.h2>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white">{selectedProduct.name}</h3>

                  <p className="text-base sm:text-lg text-cyan-300 font-semibold tracking-wide">
                    Precio: <span className="text-white">${selectedProduct.price.toFixed(2)}</span>
                  </p>

                  <div className="h-[2px] w-24 bg-gradient-to-r from-cyan-500 to-blue-400 mx-auto md:mx-0 rounded-full"></div>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed italic">
                    {selectedProduct.description || "Sin descripción disponible."}
                  </p>

                  <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-4">
                    <button
                      onClick={() => handleAddToCart(selectedProduct)}
                      className="px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 
                                 text-white font-semibold shadow-[0_0_20px_#00eaff80] transition-all text-sm sm:text-base"
                    >
                      🛒 Añadir al carrito
                    </button>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600 
                                 text-white font-semibold shadow-[0_0_20px_#ff00b880] transition-all text-sm sm:text-base"
                    >
                      ✖ Cerrar
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
