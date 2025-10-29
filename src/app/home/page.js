import React from "react";

import Header from "@/app/components/UI/Header/Header";
import VideosRecientes from "@/app/components/UI/VideoSmall/VideosRecientes";
import EmojiSubtitle from "@/app/components/UI/EmojiSubtitle/EmojiSubtitle";

import HomeNavigation from "@/app/components/Main/HomeNavigation/HomeNavigation";

const page = () => {
  return (
    <div>
      <Header></Header>
      <main className="flex flex-col justify-center">
        <EmojiSubtitle>⏳ Contenidos recientes</EmojiSubtitle>

        <VideosRecientes />

        <HomeNavigation />
      </main>
    </div>
  );
};

export default page;
