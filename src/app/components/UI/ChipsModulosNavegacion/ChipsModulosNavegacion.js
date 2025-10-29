"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

import styles from "@/app/components/UI/VolverButton/VolverButton.module.css";
import stylesButton from "@/app/components/UI/Button/Button.module.css";
import ChipsModulosSmall from "@/app/components/UI/ChipsModulosNavegacion/ChipsModulosSmall";
import Button from "@/app/components/UI/Button/";
import VolverButton from "@/app/components/UI/VolverButton/VolverButton";
import NavegacionSection from "@/app/components/UI/ChipsModulosNavegacion/NavegacionSection";

const allModulos = [
  "Onboarding",
  "Ecommerce",
  "Químicos",
  "Módulo 4",
  "Módulo 5",
  "Módulo 6",
  "Módulo 7",
  "Módulo 8",
  "Módulo 9",
  "Módulo 10",
  "Módulo 11",
  "Módulo 12",
];

const ChipsModulosNavegacion = ({ href, page, modulo }) => {
  const scrollRef = useRef(null);

  const [selectedModulo, setSelectedModulo] = useState(modulo || allModulos[0]);

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 250;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Actualizar el módulo seleccionado si cambia la prop 'modulo'
  useEffect(() => {
    if (modulo) setSelectedModulo(modulo);
  }, [modulo]);

  return (
    <div className="relative w-full space-y-4 mb-5">
      {/* Botones de navegación */}
      <div className="flex w-full justify-between">
        <VolverButton href={href} />
      </div>

      <div className="flex gap-2 mt-5">
        <Button
          className={`${stylesButton.button} px-6 py-3`}
          variant="secondary"
          type="button"
          onClick={() => handleScroll("left")}
        >
          &lt;
        </Button>

        <Button
          className={`${stylesButton.button} px-6 py-3`}
          variant="secondary"
          type="button"
          onClick={() => handleScroll("right")}
        >
          &gt;
        </Button>
      </div>

      {/* Contenedor scrollable con gradiente */}
      <div
        className="relative w-full overflow-x-auto no-scrollbar mt-5"
        ref={scrollRef}
      >
        <div className="inline-flex min-w-max gap-4">
          {allModulos.map((mod, index) => (
            <ChipsModulosSmall
              key={index}
              status={mod === selectedModulo ? "primary" : "third"}
              newVideo={mod === selectedModulo}
              onClick={() => setSelectedModulo(mod)} // 🔹 Esto hace que el chip se seleccione
            >
              {mod}
            </ChipsModulosSmall>
          ))}
        </div>

        <div className={`${styles.scrollGradientRight}`} />
      </div>

      {page === "modulo" && (
        <NavegacionSection page={page} modulo={selectedModulo} />
      )}
    </div>
  );
};

export default ChipsModulosNavegacion;
