"use client";

import React, { useState, useEffect } from "react";
import ChipsModulosNavegacion from "@/app/components/UI/ChipsModulosNavegacion/ChipsModulosNavegacion";
import VolverButton from "@/app/components/UI/VolverButton/VolverButton";
import NavegacionSection from "@/app/components/UI/ChipsModulosNavegacion/NavegacionSection";

export default function ModuloPageSelector({ id }) {
  const [moduloData, setModuloData] = useState(null);
  const [subsectionNames, setSubsectionNames] = useState([]);
  const [selectedSubsection, setSelectedSubsection] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

        // ✅ Detectar estructura flexible
        let subsections = {};
        let names = [];

        if (
          currentModulo.subsections &&
          typeof currentModulo.subsections === "object" &&
          !Array.isArray(currentModulo.subsections)
        ) {
          subsections = currentModulo.subsections;
          names = Object.keys(subsections);
        }

        setModuloData({ ...currentModulo, subsections });
        setSubsectionNames(names);

        // ✅ Si tiene subsecciones
        if (names.length > 0) {
          const firstSub = names[0];
          setSelectedSubsection(firstSub);
          setVideos(subsections[firstSub] || []);
        } else {
          // ✅ Si no tiene subsecciones, usar videos directamente
          setSelectedSubsection("videos");
          setVideos(currentModulo.videos || []);
        }
      } catch (error) {
        console.error("❌ Error cargando data.json:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSelectSubsection = (subName) => {
    if (!moduloData) return;

    if (subName === "videos") {
      setSelectedSubsection(subName);
      setVideos(moduloData.videos || []);
      return;
    }

    const selectedVideos = moduloData.subsections?.[subName] || [];
    setSelectedSubsection(subName);
    setVideos(selectedVideos);
  };

  if (isLoading)
    return (
      <div className="flex justify-center mt-10">
        <img src="/icons/loading.gif" alt="" className="w-8" />
      </div>
    );
  if (!moduloData)
    return <p className="text-center mt-10">Módulo no encontrado.</p>;

  return (
    <div className="space-y-6">
      {subsectionNames.length > 0 ? (
        <ChipsModulosNavegacion
          page="modulo"
          modulo={selectedSubsection}
          allModulos={subsectionNames}
          onSelect={handleSelectSubsection}
        />
      ) : (
        <p className="text-center text-gray-500">
          Este módulo no tiene secciones específicas
        </p>
      )}

      <NavegacionSection
        page="modulo"
        id={selectedSubsection}
        videos={videos}
      />
    </div>
  );
}
