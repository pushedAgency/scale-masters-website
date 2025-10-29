"use client";

import React from "react";
import Button from "@/app/components/UI/Button/Button";
import stylesButton from "@/app/components/UI/Button/Button.module.css";
import Image from "next/image";

const ChipsModulosSmall = ({ children, status, newVideo, onClick }) => {
  return (
    <div className="relative">
      <Button
        className={`${stylesButton.button}`}
        variant={status}
        type="button"
        onClick={onClick}
      >
        {children}
      </Button>

      {newVideo && (
        <Image
          src={`/icons/circleNewVideo.svg`}
          alt="new video icon"
          width={30}
          height={30}
          unoptimized
          className="absolute mr-8"
        />
      )}
    </div>
  );
};

export default ChipsModulosSmall;
