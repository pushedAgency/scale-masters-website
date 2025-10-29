import React from "react";

const DivsSubtitlesHero = () => {
  return (
    <section className="flex justify-center gap-4">
      <div className="flex flex-col items-end w-xl">
        <div className="justify-end gap-4 mt-1">
          <DivSubtitle className="flex justify-end">Ecommerce</DivSubtitle>
        </div>

        <div className="justify-end gap-4 mt-4">
          <DivSubtitle>Diseño</DivSubtitle>
          <DivSubtitle>Innovación</DivSubtitle>
        </div>

        <div className="justify-end gap-4 mt-4">
          <DivSubtitle>Métodos Digitales</DivSubtitle>
          <DivSubtitle>Marketing</DivSubtitle>
        </div>

        <div className="justify-end gap-4 mt-4">
          <DivSubtitle>Clases personalizadas</DivSubtitle>
          <DivSubtitle>Modelos Escalables</DivSubtitle>
        </div>
      </div>
      <div className="w-xl">
        <h1 className="subtitle">Plataforma líder en enseñanza digital</h1>
        <p className="bodyText">
          lorem ipsum bla bla bla lorem ipsum bla bla bla lorem ipsum bla bla
          bla lorem ipsum bla bla bla lorem ipsum bla bla bla
        </p>
      </div>
    </section>
  );
};

export default DivsSubtitlesHero;
