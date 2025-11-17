import Image from "next/image";

import LoginHeroDiv from "@/app/components/Main/LoginHeroDiv/LoginHeroDiv";

export default function Home() {
  return (
    <main className="flex flex-col h-svh justify-center items-center relative">
      <Image
        src={`/branding/logo-alpha.png`}
        alt="Logo Scale Masters"
        width={300}
        height={30}
        unoptimized
        className="mr-17 top-18 absolute"
      />
      <section className=" z-100">
        <LoginHeroDiv />
      </section>
    </main>
  );
}
