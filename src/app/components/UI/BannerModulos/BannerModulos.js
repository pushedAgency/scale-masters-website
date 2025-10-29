"use client";

import React from "react";
import Image from "next/image";
import styles from "@/app/components/UI/BannerModulos/BannerModulos.module.css";

export default function BannerModulos({
  onClick,
  variant,
  modulo,
  disabled = false,
  type = "button",
  isSelected = false, // ← nuevo prop
}) {
  // Diccionario con datos del módulo
  const modulosInfo = {
    Onboarding: {
      emoji: "👋",
      img: "/images/modulos/onboarding.png",
    },
    Ecommerce: {
      emoji: "👨🏻‍💻",
      img: "/images/modulos/ecommerce.jpg",
    },
    Químicos: {
      emoji: "⚛️",
      img: "/images/modulos/quimico.jpg",
    },
  };

  // Si el módulo no está definido, fallback
  const { emoji, img } = modulosInfo[modulo] || {
    emoji: "📘",
    img: "/images/modulos/default.jpg",
  };

  return (
    <button
      type={type}
      className={`
        ${styles.bannerModulos}
        ${styles[variant] || ""}
        ${isSelected ? styles.selected : ""}
        borderRadius flex w-full relative overflow-hidden
      `}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={`${styles.bannerModulosImg} absolute inset-0`}>
        <Image
          src={img}
          alt={modulo}
          width={800}
          height={400}
          unoptimized
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 flex items-end p-8 justify-center w-full h-full">
        <p className="titulos-24 capitalize">
          {emoji} {modulo}
        </p>
      </div>
    </button>
  );
}
