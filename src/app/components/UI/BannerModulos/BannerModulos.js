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
  isSelected = false,
}) {
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
      {/* Imagen de fondo con fallback */}
      {modulo.img && modulo.img.trim() !== "" ? (
        <div className={`${styles.bannerModulosImg} absolute inset-0`}>
          <Image
            src={modulo.img}
            alt={modulo.description || modulo.name || "Imagen del módulo"}
            width={800}
            height={400}
            unoptimized
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Sin imagen</p>
        </div>
      )}

      {/* Texto sobre la imagen */}
      <div className="relative z-10 flex items-end p-8 justify-center w-full h-full bg-black/30">
        <p className="titulos-24 capitalize text-white drop-shadow-md text-center">
          {modulo.emoji} {modulo.name}
        </p>
      </div>
    </button>
  );
}
