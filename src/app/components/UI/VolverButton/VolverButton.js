"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/app/components/UI/VolverButton/VolverButton.module.css";

const VolverButton = ({ href }) => {
  const router = useRouter();

  // Si hay href → usamos Link
  if (href) {
    return (
      <Link href={href} className={styles.button}>
        &lt; Volver
      </Link>
    );
  }

  // Si no hay href → usamos botón que vuelve atrás
  return (
    <button
      onClick={() => router.back()}
      className={styles.button}
      type="button"
    >
      &lt; Volver
    </button>
  );
};

export default VolverButton;
