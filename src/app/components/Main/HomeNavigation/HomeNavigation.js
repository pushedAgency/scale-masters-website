"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmojiSubtitle from "@/app/components/UI/EmojiSubtitle/EmojiSubtitle";
import BannerModulos from "@/app/components/UI/BannerModulos/BannerModulos";
import ChipModuloPrincipal from "@/app/components/UI/ChipModuloPrincipal/ChipModuloPrincipal";
import Button from "@/app/components/UI/Button/Button";
import Image from "next/image";

import styles from "@/app/components/Main/HomeNavigation/HomeNavigation.module.css";
import stylesButton from "@/app/components/UI/Button/Button.module.css";

const HomeNavigation = () => {
  const [modulosData, setModulosData] = useState({});
  const [selectedModulo, setSelectedModulo] = useState(null);
  const [selectedChips, setSelectedChips] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // 🔹 Cargar data.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data.json");
        if (!res.ok) throw new Error("No se pudo cargar data.json");
        const data = await res.json();

        setModulosData(data);

        // Inicializa los índices de chips por módulo
        const initialChips = Object.keys(data).reduce((acc, key) => {
          acc[key] = 0;
          return acc;
        }, {});
        setSelectedChips(initialChips);

        // Selecciona automáticamente el primer módulo disponible
        const primerModulo = Object.keys(data)[0];
        setSelectedModulo(primerModulo);
      } catch (error) {
        console.error("❌ Error cargando data.json:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔹 Seguridad para evitar errores antes de cargar
  if (isLoading || !selectedModulo || !modulosData[selectedModulo]) {
    return <p className="text-center mt-10">Cargando módulos...</p>;
  }

  const currentModulo = modulosData[selectedModulo];

  // ✅ Obtener los “videos” o “subsecciones” según el tipo de módulo
  const currentVideos =
    currentModulo.subsections && Object.keys(currentModulo.subsections).length
      ? Object.keys(currentModulo.subsections).map((title) => ({
          filename: title,
        }))
      : currentModulo.videos || [];

  const currentChipIndex = selectedChips[selectedModulo] || 0;
  const currentVideo = currentVideos[currentChipIndex];

  // 🔹 Handlers
  const handleChipClick = (index) => {
    setSelectedChips((prev) => ({
      ...prev,
      [selectedModulo]: index,
    }));
  };

  const handleModuloClick = (modulo) => {
    setSelectedModulo(modulo);
  };

  return (
    <section>
      {/* 🔹 Banners */}
      <div className="grid grid-cols-3 gap-5 mt-4 mb-4">
        {Object.entries(modulosData).map(([nombre, data]) => (
          <BannerModulos
            key={nombre}
            modulo={{ ...data, name: nombre }}
            onClick={() => handleModuloClick(nombre)}
            isSelected={selectedModulo === nombre}
          />
        ))}
      </div>

      {/* ✨ ANIMACIÓN: Contenido dinámico del módulo seleccionado */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedModulo}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {/* 🔹 Título dinámico */}
          <EmojiSubtitle>
            {currentModulo.emoji} {selectedModulo}
          </EmojiSubtitle>

          {/* 🔹 Descripción del módulo */}
          <p className="mt-2 mb-6 cuerpo-24 text-start leading-relaxed">
            {currentModulo.description}
          </p>

          {/* 🔹 Contenedor principal */}
          <div className="flex gap-4 w-full">
            {/* Izquierda: lista de chips */}
            <div className="w-1/2 flex flex-col gap-2">
              <AnimatePresence>
                {currentVideos.map((video, index) => (
                  <motion.div
                    key={video.filename}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: "easeOut",
                    }}
                  >
                    <ChipModuloPrincipal
                      variant={
                        currentChipIndex === index ? "selected" : "default"
                      }
                      onClick={() => handleChipClick(index)}
                    >
                      {video.filename}
                    </ChipModuloPrincipal>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Derecha: Detalle y preview */}
            <div className={`w-1/2 ${styles.modalSelectedModulo}`}>
              <Image
                src={`/images/videoThumbnail.png`}
                alt={selectedModulo}
                width={1920}
                height={1080}
                unoptimized
                className={styles.imageThumbnail}
              />

              {currentVideo && (
                <>
                  <p className="botones-20 accent mt-5 text-start capitalize">
                    {currentVideo.filename}
                  </p>

                  <p className="mt-5 text-start leading-relaxed">
                    {currentModulo.subsections
                      ? "Esta subsección contiene clases y casos prácticos del módulo."
                      : `Este módulo incluye ${currentVideos.length} video(s) con contenido práctico.`}
                  </p>

                  <p className="cuerpo-24 accent mt-5 text-start">Contenido</p>

                  <div className="mt-5 mb-5 flex gap-2 items-center justify-start">
                    <Image
                      src={"/icons/playButtonSmall.svg"}
                      alt="play button small"
                      width={20}
                      height={20}
                      unoptimized
                      className={`${styles.imageThumbnail}`}
                    />
                    <p className="cuerpo-24">
                      {currentVideos.length}{" "}
                      {currentModulo.subsections
                        ? "módulos disponibles"
                        : "videos disponibles"}
                    </p>
                  </div>
                </>
              )}

              <Button
                className={`${stylesButton.button}`}
                variant="primary"
                type="button"
                href={`/modulo/${selectedModulo.toLowerCase()}`}
              >
                Ver módulo completo
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default HomeNavigation;
