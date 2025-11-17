"use client";

import React, { useState, useEffect } from "react";
import ChipsModulosNavegacion from "@/app/components/UI/ChipsModulosNavegacion/ChipsModulosNavegacion";
import NavegacionSection from "@/app/components/UI/ChipsModulosNavegacion/NavegacionSection";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ModuloPageSelector({ id, submodulo }) {
  const [moduloData, setModuloData] = useState(null);
  const [subsectionNames, setSubsectionNames] = useState([]);
  const [selectedSubsection, setSelectedSubsection] = useState(null);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Normaliza los strings para compararlos: sin acentos, minúsculas, sin espacios/guiones
  const normalize = (str) =>
    str
      ?.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // quita acentos
      .replace(/[\s-]+/g, "") // quita espacios y guiones
      .toLowerCase()
      .trim();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data.json");
        const data = await res.json();
        const currentModulo = data[id];

        if (!currentModulo) {
          console.warn(`[ModuloPageSelector] ⚠️ Módulo "${id}" no encontrado`);
          setModuloData(null);
          setSubsectionNames([]);
          setVideos([]);
          setSelectedSubsection(null);
          return;
        }

        const names = currentModulo.submodulo ? Object.keys(currentModulo.submodulo) : [];
        setModuloData(currentModulo);
        setSubsectionNames(names);

        // Decodificar submodulo de la URL
        const decodedSub = submodulo ? decodeURIComponent(submodulo) : null;

        // Buscar coincidencia normalizada
        const matched = names.find((name) => normalize(name) === normalize(decodedSub));

        const firstSub = matched || names[0] || "videos";
        setSelectedSubsection(firstSub);
        setVideos(currentModulo.submodulo?.[firstSub] || currentModulo.videos || []);
      } catch (error) {
        console.error("❌ Error cargando data.json:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, submodulo]);

  const handleSelectSubsection = (subName) => {
    if (!moduloData) return;

    setSelectedSubsection(subName);
    setVideos(moduloData.submodulo?.[subName] || moduloData.videos || []);
    setSelectedVideo(null);
  };

  const handleSelectVideo = (video) => {
    setSelectedVideo(video);
  };

  if (isLoading)
    return (
      <div className="flex justify-center mt-10">
        <Image height={100} width={100} src="/icons/loading.gif" alt="" className="w-8" />
      </div>
    );

  if (!moduloData) return <p className="text-center mt-10">Módulo no encontrado.</p>;

  return (
    <div className="space-y-6">
      {subsectionNames.length > 0 ? (
        <ChipsModulosNavegacion
          page="modulo"
          modulo={selectedSubsection} // aquí va el chip seleccionado
          allModulos={subsectionNames}
          onSelect={handleSelectSubsection}
        />
      ) : (
        <p className="text-center text-gray-500">
          Este módulo no tiene secciones específicas
        </p>
      )}

      {selectedVideo && (
        <motion.div
          key={selectedVideo.id || selectedVideo.filename}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full mb-5 rounded-2xl overflow-hidden shadow-lg"
        >
          <iframe
            src={`https://player.mux.com/${selectedVideo.playbackId}?autoplay=false&muted=false&controls=true&accent-color=%2324f3ff`}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
            style={{ width: "100%", border: "none", aspectRatio: "16/9" }}
            title={selectedVideo.filename || "Video Mux"}
          />
        </motion.div>
      )}

      <NavegacionSection
        page="modulo"
        id={selectedSubsection}
        videos={videos}
        onSelectVideo={handleSelectVideo}
      />
    </div>
  );
}
