import React from "react";
import Header from "@/app/components/UI/Header/Header";
import Image from "next/image";

import ChipsModulosNavegacion from "@/app/components/UI/ChipsModulosNavegacion/ChipsModulosNavegacion";
import ComponenteVideoModulo from "@/app/components/UI/ComponenteVideoModulo/ComponenteVideoModulo";
import styles from "@/app/singleVideo/[id]/singleVideo.module.css";
import EmojiSubtitle from "@/app/components/UI/EmojiSubtitle";

const Page = async ({ params }) => {
  const { id } = await params;
  return (
    <div>
      <Header></Header>
      <main className="">
        <ChipsModulosNavegacion />

        <section className="flex gap-20">
          <div className="w-3/5">
            <EmojiSubtitle>📚 Titulo de modulo</EmojiSubtitle>
            <iframe
              src={`https://player.mux.com/CTGh4qPghaP009l00Z01XwaOjPOVapAZn95fossQzD9wp8?autoplay=false&muted=false&controls=true&accent-color=%2324f3ff`}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
              style={{
                width: "100%",
                border: "none",
                aspectRatio: "16/9",
              }}
              title="Video Mux"
              className="w-full mb-5 borderRadius"
            />

            <EmojiSubtitle>Titulo de video</EmojiSubtitle>
          </div>

          <div className="w-2/5">
            <ComponenteVideoModulo href="/singleVideo/1" status={true}>
              Chau
            </ComponenteVideoModulo>
            <ComponenteVideoModulo>Chau</ComponenteVideoModulo>
            <ComponenteVideoModulo>Chau</ComponenteVideoModulo>
            <ComponenteVideoModulo>Chau</ComponenteVideoModulo>
            <ComponenteVideoModulo>Chau</ComponenteVideoModulo>
            <ComponenteVideoModulo>Chau</ComponenteVideoModulo>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;
