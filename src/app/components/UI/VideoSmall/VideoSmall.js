import React from "react";
import Image from "next/image";

import styles from "@/app/components/UI/VideoSmall/VideoSmall.module.css";

const VideoSmall = ({ variant, data }) => {
  return (
    <section>
      <a className={`p-5 flex flex-col borderRadius ${styles.buttonVideoSmall} ${styles[variant]}`}>
        <Image
          src={`/images/videoThumbnail.png`}
          alt="Video Thumbnail"
          width={1920}
          height={1080}
          unoptimized
          className={`${styles.imageThumbnail}`}
        />
        <h4 className={`${styles.chipCategorias} cuerpo-12 mt-2`}>{data.modulo}</h4>
        <p className={`${styles.title} cuerpo-16 mt-2`}>{data.filename}</p>
        <p className="accent cuerpo-16">00:00</p>
      </a>
      {variant === "reciente" && (
        <p className="accent mt-2 flex gap-1 accent">
          <Image
            src={`/icons/circleNewVideo.svg`}
            alt="Video Thumbnail"
            width={10}
            height={10}
            unoptimized
          />
          Último video
        </p>
      )}
    </section>
  );
};

export default VideoSmall;
