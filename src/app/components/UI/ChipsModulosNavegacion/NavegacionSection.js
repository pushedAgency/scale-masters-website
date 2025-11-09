"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmojiSubtitle from "@/app/components/UI/EmojiSubtitle/EmojiSubtitle";
import ComponenteVideoModulo from "@/app/components/UI/ComponenteVideoModulo/ComponenteVideoModulo";

export default function NavegacionSection({ page, id, videos = [] }) {
  const [loadedImages, setLoadedImages] = useState({});

  // 🔹 Resetear estados de carga al cambiar subsección
  useEffect(() => {
    const reset = {};
    videos.forEach((v) => (reset[v.playbackId] = false));
    setLoadedImages(reset);
  }, [videos]);

  const handleImageLoad = (playbackId) => {
    setLoadedImages((prev) => ({ ...prev, [playbackId]: true }));
  };

  return (
    <section>
      {page === "modulo" && (
        <section className="flex justify-between gap-20">
          {/* 🧭 COLUMNA IZQUIERDA (ANIMADA) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={id + "-info"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="w-1/3"
            >
              <EmojiSubtitle>{id}</EmojiSubtitle>
              <h3 className="accent">Contenido</h3>
              <p className="mt-5 leading-relaxed text-start">
                En esta subsección te muestro los videos correspondientes a{" "}
                <strong>{id}</strong>, donde vas a aprender de forma práctica y
                ordenada todos los conocimientos.
              </p>
            </motion.div>
          </AnimatePresence>

          {/* 🎬 COLUMNA DERECHA (CON TRANSICIÓN ENTRE SUBSECCIONES) */}
          <div className="w-1/2 mt-15 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={id} // 👈 esto hace que se anime al cambiar de módulo
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                {videos.length > 0 ? (
                  videos.map((video, index) => (
                    <motion.div
                      key={`${video.playbackId}-${index}`} // ✅ clave única
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                        delay: index * 0.1, // animación escalonada
                      }}
                    >
                      <ComponenteVideoModulo
                        playbackId={video.playbackId}
                        href={`/singleVideo/${video.playbackId}/${video.filename}`}
                        isLoaded={loadedImages[video.playbackId]}
                        onImageLoad={() => handleImageLoad(video.playbackId)}
                      >
                        {video.filename}
                      </ComponenteVideoModulo>
                    </motion.div>
                  ))
                ) : (
                  <p className="opacity-70 mt-5">
                    No hay videos en esta sección.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}
    </section>
  );
}
