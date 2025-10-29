import React from "react";

import EmojiSubtitle from "@/app/components/UI/EmojiSubtitle/EmojiSubtitle";
import ComponenteVideoModulo from "@/app/components/UI/ComponenteVideoModulo/ComponenteVideoModulo";
import stylesButton from "@/app/components/UI/Button/Button.module.css";

export default function NavegacionSection({ page }) {
  return (
    <section>
      {page === "modulo" && (
        <section className="flex justify-between gap-20">
          <div className="w-1/3">
            <EmojiSubtitle>⏳ Contenidos recientes</EmojiSubtitle>
            <h3 className="accent">Contenido</h3>

            <p className="mt-5">
              En este módulo te enseño cómo buscar productos ganadores, cómo
              analizarlos, y te doy estrategias concretas para encontrar ese
              producto que puede marcar un antes y un después.
            </p>
          </div>

          <div className="w-1/2 mt-15">
            <ComponenteVideoModulo href="/singleVideo/1">
              Chau
            </ComponenteVideoModulo>
            <ComponenteVideoModulo>Chau</ComponenteVideoModulo>
            <ComponenteVideoModulo>Chau</ComponenteVideoModulo>
            <ComponenteVideoModulo>Chau</ComponenteVideoModulo>
            <ComponenteVideoModulo>Chau</ComponenteVideoModulo>
          </div>
        </section>
      )}
    </section>
  );
}
