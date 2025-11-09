"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "@/app/components/UI/EmojiSubtitle/EmojiSubtitle.module.css";

export default function EmojiSubtitle({ children }) {
  return (
    <motion.h3
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`${styles.subtitle} mb-4 capitalize titulos-primarios`}
    >
      {children}
    </motion.h3>
  );
}
