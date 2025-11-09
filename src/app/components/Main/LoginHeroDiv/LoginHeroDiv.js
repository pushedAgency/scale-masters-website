"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import styles from "./LoginHeroDiv.module.css";
import Button from "@/app/components/UI/Button";
import stylesButton from "@/app/components/UI/Button/Button.module.css";

const LoginDiv = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("redirect") || "/home";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push(redirectPath);
    } else {
      setError("Contraseña incorrecta. Inténtalo de nuevo.");
    }
  };

  return (
    <section className={styles.loginHeroDiv}>
      <h2 className="subtitle">🔒 Acceso restringido</h2>

      <form onSubmit={handleSubmit} className="flex items-center mt-5">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Ingrese contraseña"
          className={`${stylesButton.button} mr-5 ${
            error ? styles.errorInput : ""
          }`}
        />

        <Button className={stylesButton.button} variant="primary" type="submit">
          &gt;
        </Button>
      </form>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </section>
  );
};

export default LoginDiv;
