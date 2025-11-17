import Header from "@/app/components/UI/Header/Header";
import ModulosPageSelector from "@/app/components/UI/ModulosPageSelector/ModulosPageSelector";

export default async function Page({ params }) {
  const { id, submodulo } = await params;

  return (
    <div>
      <Header />
      <main>
        <ModulosPageSelector id={id} submodulo={submodulo} />
      </main>
    </div>
  );
}
