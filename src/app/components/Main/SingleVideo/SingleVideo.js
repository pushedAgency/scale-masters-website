import React from "react";

export const SingleVideo = () => {
  return (
    <div>
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
    </div>
  );
};
