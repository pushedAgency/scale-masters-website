"use client";

import React, { useState, useEffect } from "react";
import EmojiSubtitle from "@/app/components/UI/EmojiSubtitle/EmojiSubtitle";
import BannerModulos from "@/app/components/UI/BannerModulos/BannerModulos";
import ChipModuloPrincipal from "@/app/components/UI/ChipModuloPrincipal/ChipModuloPrincipal";
import Button from "@/app/components/UI/Button/Button";
import Image from "next/image";

import styles from "@/app/components/Main/HomeNavigation/HomeNavigation.module.css";
import stylesButton from "@/app/components/UI/Button/Button.module.css";

const HomeNavigation = () => {
  const [modulosData, setModulosData] = useState({});
  const [selectedModulo, setSelectedModulo] = useState("Onboarding");
  const [selectedChips, setSelectedChips] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data.json");
        const data = await res.json();
        setModulosData(data);

        // Inicializa el estado de los chips (por cada módulo, índice 0)
        const initialChips = Object.keys(data).reduce((acc, key) => {
          acc[key] = 0;
          return acc;
        }, {});
        setSelectedChips(initialChips);
        setIsLoading(false);
      } catch (error) {
        console.error("Error cargando data.json:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🧠 Seguridad: evita render hasta que cargue
  if (isLoading || !modulosData[selectedModulo]) {
    return <p className="text-center mt-10">Cargando módulos...</p>;
  }

  const currentModulo = modulosData[selectedModulo];
  const currentChipIndex = selectedChips[selectedModulo] || 0;
  const currentVideo = currentModulo.videos[currentChipIndex];

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
        {Object.keys(modulosData).map((modulo) => (
          <BannerModulos
            key={modulo}
            modulo={modulo}
            onClick={() => handleModuloClick(modulo)}
            isSelected={selectedModulo === modulo}
          />
        ))}
      </div>

      {/* 🔹 Título dinámico */}
      <EmojiSubtitle>
        {currentModulo.emoji} {selectedModulo}
      </EmojiSubtitle>

      {/* 🔹 Descripción del módulo */}
      <p className="mt-2 mb-6 cuerpo-24">{currentModulo.description}</p>

      {/* 🔹 Contenedor con chips + vista del video */}
      <div className="flex gap-4 w-full">
        {/* Mitad izquierda: Chips */}
        <div className="w-1/2 flex flex-col gap-2">
          {currentModulo.videos.map((video, index) => (
            <ChipModuloPrincipal
              key={index}
              variant={currentChipIndex === index ? "selected" : "default"}
              onClick={() => handleChipClick(index)}
            >
              {video.filename}
            </ChipModuloPrincipal>
          ))}
        </div>

        {/* Mitad derecha: Detalle */}
        <div className={`w-1/2 ${styles.modalSelectedModulo}`}>
          <Image
            src={`/images/videoThumbnail.png`}
            alt={selectedModulo}
            width={1920}
            height={1080}
            unoptimized
            className={styles.imageThumbnail}
          />
          <p className="botones-20 accent mt-5">{currentVideo.filename}</p>

          <p className="mt-5">
            Este módulo incluye {currentModulo.videos.length} video(s) con
            contenido actualizado y práctico.
          </p>

          <p className="cuerpo-24 accent mt-5">Contenido</p>

          <div className="mt-5 mb-5 flex gap-2 items-center justify-center">
            <Image
              src={"/icons/playButtonSmall.svg"}
              alt="play button small"
              width={20}
              height={20}
              unoptimized
              className={`${styles.imageThumbnail}`}
            />
            <p className="cuerpo-24">
              {currentModulo.videos.length} videos disponibles
            </p>
          </div>
          <Button
            className={`${stylesButton.button}`}
            variant="primary"
            type="submit"
            href={`/modulo/${selectedModulo.toLowerCase()}`}
          >
            Ver módulo completo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeNavigation;
