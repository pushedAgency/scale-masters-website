"use client";

import React from "react";
import styles from "@/app/components/UI/EmojiSubtitle/EmojiSubtitle.module.css";

export default function EmojiSubtitle({ children }) {
  return (
    <h3 className={`${styles.subtitle} mb-4 titulos-primarios`}>
      {children}
    </h3>
  );
}
