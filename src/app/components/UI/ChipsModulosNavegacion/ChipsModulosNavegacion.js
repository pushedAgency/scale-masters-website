"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import ChipsModulosSmall from "./ChipsModulosSmall";
import Button from "@/app/components/UI/Button/";
import VolverButton from "@/app/components/UI/VolverButton/VolverButton";
import stylesButton from "@/app/components/UI/Button/Button.module.css";
import styles from "@/app/components/UI/VolverButton/VolverButton.module.css";

const ChipsModulosNavegacion = ({ href, modulo, allModulos, onSelect }) => {
  const scrollRef = useRef(null);
  const [selectedModulo, setSelectedModulo] = useState(null);

  // ✅ Asegura que el chip correcto se actualice cuando "modulo" cambie
  useEffect(() => {
    if (modulo) {
      setSelectedModulo(modulo);
    } else if (allModulos?.length > 0) {
      setSelectedModulo(allModulos[0]);
    }
  }, [modulo, allModulos]);

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 250;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!allModulos || allModulos.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 },
    },
  };

  const chipVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="relative w-full space-y-4 mb-5"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex w-full justify-between absolute mt-4">
        <VolverButton href={"/home"} />
      </div>

      <div className="flex gap-2 mt-5 float-right">
        <div className="button-arrow">
          <Button
            className={`${stylesButton.button} px-6 py-3 button-arrow`}
            variant="secondary"
            type="button"
            onClick={() => handleScroll("left")}
          >
            &lt;
          </Button>
        </div>

        <div className="button-arrow">
          <Button
            className={`${stylesButton.button} px-6 py-3`}
            variant="secondary"
            type="button"
            onClick={() => handleScroll("right")}
          >
            &gt;
          </Button>
        </div>
      </div>

      <div
        className="relative w-full overflow-x-auto no-scrollbar mt-5"
        ref={scrollRef}
      >
        <motion.div
          className="inline-flex min-w-max gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {allModulos.map((name, index) => (
            <motion.div key={index} variants={chipVariants}>
              <ChipsModulosSmall
                status={name === selectedModulo ? "primary" : "third"}
                onClick={() => {
                  setSelectedModulo(name);
                  if (onSelect) onSelect(name);
                }}
              >
                {name}
              </ChipsModulosSmall>
            </motion.div>
          ))}
        </motion.div>

        <div className={`${styles.scrollGradientRight}`} />
      </div>
    </motion.div>
  );
};

export default ChipsModulosNavegacion;
