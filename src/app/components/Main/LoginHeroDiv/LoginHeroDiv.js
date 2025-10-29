import React from "react";
import styles from "./LoginHeroDiv.module.css";

import Button from "@/app/components/UI/Button";
import stylesButton from "@/app/components/UI/Button/Button.module.css";

const LoginDiv = () => {
  return (
    <section className={`${styles.loginHeroDiv}`}>
      {/*
      <button>X</button>
      */}

      <h2 className="subtitle">🔒 Acceso restringido</h2>

      <div className="flex items-center mt-5">
        <input
          type="password"
          id="password"
          required
          placeholder="Ingrese contraseña"
          className={`${stylesButton.button} mr-5`}
        />

        <Button
          className={`${stylesButton.button}`}
          variant="primary"
          type="submit"
          href="/home"
        >
          &gt;
        </Button>
      </div>
    </section>
  );
};

export default LoginDiv;
