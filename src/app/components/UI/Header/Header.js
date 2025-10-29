import React from "react";
import Image from "next/image";

const Header = ({}) => {
  return (
    <header className="relative w-full h-[60vh] flex justify-center items-center overflow-hidden">
      {/* Imagen de fondo */}
      <Image
        src="/images/header-pto-madero.png"
        alt="Fondo Puerto Madero"
        fill
        priority
        className="object-cover z-0"
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Logo superpuesto */}
      <div className="z-20">
        <Image
          src="/branding/logo-alpha.png"
          alt="Logo Scale Masters"
          width={200}
          height={30}
          unoptimized
        />
      </div>
    </header>
  );
};

export default Header;
