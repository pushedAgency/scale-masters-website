"use client";

import React from "react";
import Link from "next/link";
import styles from "@/app/components/UI/ComponenteVideoModulo/ComponenteVideoModulo.module.css";
import Image from "next/image";
import EmojiSubtitle from "@/app/components/UI/EmojiSubtitle";

const ComponenteVideoModulo = ({ children, status, href = "#" }) => {
  return (
    <Link
      href={href}
      className={`${styles.divComponenteVideoModulo} flex items-center gap-5`}
    >
      <div className="relative flex justify-center items-center">
        {/* Miniatura del video */}
        <Image
          src="/images/videoThumbnail.png"
          alt="Thumbnail del video"
          width={200}
          height={225}
          unoptimized
          className="rounded-lg object-cover"
        />

        {/* Ícono de play centrado */}
        <Image
          src="/icons/playButton.svg"
          alt="Play button"
          width={30}
          height={30}
          unoptimized
          className="absolute z-10"
        />
      </div>

      {/* Texto con clase condicional */}
      <p className={`${styles.status} ${status ? "accent" : ""}`}>{children}</p>
    </Link>
  );
};

export default ComponenteVideoModulo;
