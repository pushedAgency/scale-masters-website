"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/components/UI/ComponenteVideoModulo/ComponenteVideoModulo.module.css";

const ComponenteVideoModulo = ({ children, status, href = "#", playbackId }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link
        href={href}
        className={`${styles.divComponenteVideoModulo} flex items-center gap-5`}
      >
        <div className="relative flex justify-center items-center w-[200px] h-[120px] rounded-lg overflow-hidden">
          {/* 🌀 Loading Skeleton */}
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
              <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Miniatura */}
          <Image
            src={`https://image.mux.com/${playbackId}/thumbnail.jpg`}
            alt="Thumbnail del video"
            width={200}
            height={120}
            unoptimized
            className={`rounded-lg object-cover transition-opacity duration-500 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageLoaded(true)}
          />

          {/* Ícono de play */}
          {isImageLoaded && (
            <Image
              src="/icons/playButton.svg"
              alt="Play button"
              width={30}
              height={30}
              unoptimized
              className="absolute z-10"
            />
          )}
        </div>

        <p className={`${styles.status} ${status ? "accent" : ""}`}>
          {children}
        </p>
      </Link>
    </motion.div>
  );
};

export default ComponenteVideoModulo;
