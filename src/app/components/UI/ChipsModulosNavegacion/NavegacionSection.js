"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmojiSubtitle from "@/app/components/UI/EmojiSubtitle/EmojiSubtitle";
import ComponenteVideoModulo from "@/app/components/UI/ComponenteVideoModulo/ComponenteVideoModulo";

export default function NavegacionSection({ page, id, videos = [] }) {
  const [loadedImages, setLoadedImages] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const reset = {};
    videos.forEach((v) => (reset[v.playbackId] = false));
    setLoadedImages(reset);
    setSelectedVideo(null);
  }, [videos]);

  const handleImageLoad = (playbackId) => {
    setLoadedImages((prev) => ({ ...prev, [playbackId]: true }));
  };

  return (
    <section>
      {page === "modulo" && (
        <motion.section
          // ❌ quitamos layout
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex justify-between gap-20"
        >
          {/* 🧭 COLUMNA IZQUIERDA */}
          <motion.div
            // ❌ quitamos layout para evitar deformación
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={`${selectedVideo ? "w-[60%]" : "w-1/2"}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={id + "-info"}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <EmojiSubtitle>{id}</EmojiSubtitle>
                <h3 className="accent">Contenido</h3>
                <p className="mt-5 leading-relaxed text-start">
                  En esta subsección te muestro los videos correspondientes a{" "}
                  <strong>{id}</strong>, donde vas a aprender de forma práctica
                  y ordenada todos los conocimientos.
                </p>

                {/* 🎬 Video aparece debajo del texto */}
                <AnimatePresence mode="wait">
                  {selectedVideo && (
                    <motion.div
                      key={selectedVideo.playbackId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="mt-6"
                    >
                      <iframe
                        src={`https://player.mux.com/${selectedVideo.playbackId}?autoplay=true&muted=false&controls=true&accent-color=%2317e6da`}
                        allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;"
                        allowFullScreen
                        style={{
                          width: "100%",
                          border: "none",
                          aspectRatio: "16/9",
                          borderRadius: "1rem",
                        }}
                        title={selectedVideo.filename}
                      />
                      <h4 className="mt-3 text-sm font-medium text-accent">
                        {selectedVideo.filename}
                      </h4>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* 🎥 COLUMNA DERECHA */}
          <motion.div
            // ❌ quitamos layout aquí también
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={`${selectedVideo ? "w-[40%]" : "w-1/2"} mt-15 relative`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                {videos.length > 0 ? (
                  videos.map((video, index) => {
                    const isActive =
                      selectedVideo?.playbackId === video.playbackId;
                    return (
                      <motion.div
                        key={`${video.playbackId}-${index}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: "easeOut",
                          delay: index * 0.1,
                        }}
                      >
                        <div
                          onClick={() => setSelectedVideo(video)}
                          className="cursor-pointer transition-all"
                        >
                          <ComponenteVideoModulo
                            key={video.playbackId}
                            playbackId={video.playbackId}
                            selected={
                              selectedVideo?.playbackId === video.playbackId
                            }
                            onSelectVideo={(id) =>
                              setSelectedVideo(
                                videos.find((v) => v.playbackId === id)
                              )
                            }
                          >
                            {video.filename}
                          </ComponenteVideoModulo>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <p className="opacity-70 mt-5">
                    No hay videos en esta sección.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.section>
      )}
    </section>
  );
}
