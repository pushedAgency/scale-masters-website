"use client";

import React from "react";
import Header from "@/app/components/UI/Header/Header";
import VideosRecientes from "@/app/components/UI/VideoSmall/VideosRecientes";
import EmojiSubtitle from "@/app/components/UI/EmojiSubtitle/EmojiSubtitle";
import HomeNavigation from "@/app/components/Main/HomeNavigation/HomeNavigation";
import { motion } from "framer-motion";

const page = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.3 },
        },
      }}
    >
      <Header />

      <motion.main
        className="flex flex-col justify-center"
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="mt-4">
          {/*<EmojiSubtitle>⏳ Contenidos recientes</EmojiSubtitle>*/}
        </div>

        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ delay: 0.3 }}
        >
          {/*<VideosRecientes />*/}
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: 0.6 }}
        >
          <HomeNavigation />
        </motion.div>
      </motion.main>
    </motion.div>
  );
};

export default page;
