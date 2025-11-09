"use client";

import React from "react";
import { motion } from "framer-motion";

export const SingleVideo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <iframe
        src={`https://player.mux.com/CTGh4qPghaP009l00Z01XwaOjPOVapAZn95fossQzD9wp8?autoplay=false&muted=false&controls=true&accent-color=%2317e6da`}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
        style={{
          width: "100%",
          border: "none",
          aspectRatio: "16/9",
        }}
        title="Video Mux"
      />
    </motion.div>
  );
};
