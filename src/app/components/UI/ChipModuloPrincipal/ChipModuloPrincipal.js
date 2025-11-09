"use client";

import React from "react";
import styles from "@/app/components/UI/ChipModuloPrincipal/ChipModuloPrincipal.module.css";

export default function ChipModuloPrincipal({ variant, children, onClick }) {
  return (
    <button
      className={`
        ${styles.chipModuloPrincipal}
        ${styles[variant] || ""}
        botones-24 flex items-center text-start leading-relaxed
      `}
      onClick={onClick}
    >
      <h3>{children}</h3>
    </button>
  );
}
