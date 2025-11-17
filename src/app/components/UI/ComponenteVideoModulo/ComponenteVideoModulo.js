"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "@/app/components/UI/ComponenteVideoModulo/ComponenteVideoModulo.module.css";

const ComponenteVideoModulo = ({
  children,
  playbackId,
  onSelectVideo, // función callback para seleccionar video
  selected = false, // 🔹 prop booleana que marca si está seleccionado
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleClick = () => {
    if (onSelectVideo) onSelectVideo(playbackId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div
        onClick={handleClick}
        className={`${styles.divComponenteVideoModulo} flex items-center gap-5 cursor-pointer ${
          selected ? "list-video-selected" : ""
        }`}
        style={{
          alignItems: "center",
        }}
      >
        {/* 🎞 Contenedor miniatura con ancho fijo */}
        <div
          className={`relative flex-shrink-0 flex justify-center items-center rounded-lg overflow-hidden ${styles.componenteVideoModuloImg}`}
          style={{
            width: "220px",
            height: "120px",
          }}
        >
          {/* 🌀 Loading Skeleton */}
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
              <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* 🖼 Miniatura */}
          <Image
            src={`https://image.mux.com/${playbackId}/thumbnail.jpg`}
            alt="Thumbnail del video"
            width={220}
            height={120}
            unoptimized
            className={`rounded-lg object-cover transition-opacity duration-500 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageLoaded(true)}
          />

          {/* ▶ Ícono de play */}
          {isImageLoaded && (
            <Image
              src="/icons/playButton.svg"
              alt="Play button"
              width={100}
              height={100}
              unoptimized
              className="playButton absolute z-10"
            />
          )}
        </div>

        {/* 📝 Texto del video */}
        <p
          className={`${styles.status} text-base leading-snug`}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          {children}
        </p>
      </div>
    </motion.div>
  );
};

export default ComponenteVideoModulo;
