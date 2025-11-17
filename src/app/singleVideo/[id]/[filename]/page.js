"use client";

import React from "react";
import Header from "@/app/components/UI/Header/Header";

import ChipsModulosNavegacion from "@/app/components/UI/ChipsModulosNavegacion/ChipsModulosNavegacion";
import ComponenteVideoModulo from "@/app/components/UI/ComponenteVideoModulo/ComponenteVideoModulo";
import EmojiSubtitle from "@/app/components/UI/EmojiSubtitle";
import VolverButton from "@/app/components/UI/VolverButton/VolverButton";
import { motion } from "framer-motion";

const Page = ({ params }) => {
  const { filename, id } = React.use(params);

  return (
    <div>
      <Header />
      <main className="">
        <div className="flex w-full justify-between">
          <VolverButton href={"/modulo/ecommerce"} />
        </div>
        <ChipsModulosNavegacion />

        <section className="flex gap-20">
          <div className="w-3/5">
            <EmojiSubtitle>📚 Titulo de modulo</EmojiSubtitle>

            {/* 🎬 Animación envolviendo el iframe */}
            <motion.div
              key={id} // se vuelve a animar si cambia el video
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full mb-5 borderRadius overflow-hidden"
            >
              <iframe
                src={`https://player.mux.com/${id}?autoplay=false&muted=false&controls=true&accent-color=%2324f3ff`}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen
                style={{
                  width: "100%",
                  border: "none",
                  aspectRatio: "16/9",
                }}
                title="Video Mux"
                className="w-full"
              />
            </motion.div>

            <EmojiSubtitle>{decodeURIComponent(filename)}</EmojiSubtitle>
          </div>

          <div className="w-2/5">
            <ComponenteVideoModulo href="/singleVideo/1" status={true}>
              Chau
            </ComponenteVideoModulo>
            <ComponenteVideoModulo>Chau</ComponenteVideoModulo>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;
