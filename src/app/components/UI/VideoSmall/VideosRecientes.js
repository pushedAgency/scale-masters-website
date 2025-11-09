"use client";

import React, { useEffect, useState } from "react";
import VideoSmall from "@/app/components/UI/VideoSmall/VideoSmall";

const VideosRecientes = () => {
  const [videosRecientes, setVideosRecientes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`Error HTTP! Estado: ${res.status}`);
        const data = await res.json();

        // 🧩 Aplanar todos los videos de todos los módulos, solo si existen
        const allVideos = Object.keys(data).flatMap((modulo) => {
          const moduloData = data[modulo];
          const videos = Array.isArray(moduloData.videos)
            ? moduloData.videos
            : [];

          return videos.map((video) => ({
            ...video,
            modulo,
            descripcion: moduloData.descripcion || moduloData.description || "",
          }));
        });

        // 🔹 Ordenar por fecha descendente y tomar los 6 más recientes
        const sortedVideos = allVideos
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
          .slice(0, 6);

        setVideosRecientes(sortedVideos);
      } catch (err) {
        console.error("Error cargando videos recientes:", err);
      }
    };

    fetchData();
  }, []);

  if (videosRecientes.length === 0) {
    return <p className="text-center mt-6">No hay videos recientes.</p>;
  }

  return (
    <section className="flex gap-2 flex-wrap">
      {videosRecientes.map((video, index) => (
        <div
          key={index}
          className="flex-none"
          style={{ width: `calc((100% - ${5 * 8}px) / 6)` }} // 6 videos con gap de 8px
        >
          <VideoSmall
            variant={index === 0 ? "reciente" : "default"}
            data={video}
          />
        </div>
      ))}
    </section>
  );
};

export default VideosRecientes;
