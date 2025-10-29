"use client";

import React from "react";
import styles from "@/app/components/UI/DivSubtitle/DivSubtitle";

export default function DivSubtitle({ children }) {
  return (
    <h3 className={`${styles.divSubtitle} subtitle`}>
      {children}
    </h3>
  );
}
