import styles from "./page.module.css";

import Header from "@/app/components/UI/Header/Header";

import ChipsModulosNavegacion from "@/app/components/UI/ChipsModulosNavegacion/ChipsModulosNavegacion";

const Page = async ({ params }) => {
  const { id } = await params;

  return (
    <div>
      <Header></Header>
      <main className="">
        <ChipsModulosNavegacion page="modulo" modulo={id} />
      </main>
    </div>
  );
};

export default Page;
