import Image from "next/image";
import DivSubtitle from "@/app/components/UI/DivSubtitle";

import LoginHeroDiv from "@/app/components/Main/LoginHeroDiv/LoginHeroDiv";

export default function Home() {
  return (
    <main className="flex flex-col h-svh justify-center items-center relative">
      <section className="absolute z-100">
        <LoginHeroDiv />
      </section>

      {/**
      <Image
        src={`/branding/logo-alpha.png`}
        alt="Logo Scale Masters"
        width={500}
        height={30}
        unoptimized
        className="mr-8 absolute"
      />
       */}
    </main>
  );
}
