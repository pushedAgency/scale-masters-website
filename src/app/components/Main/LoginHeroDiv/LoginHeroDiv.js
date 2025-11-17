"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";
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
      setError("❌ Contraseña incorrecta");
    }
  };

  return (
    <section className={styles.loginHeroDiv}>
      <AnimatePresence mode="wait">
        <motion.h2
          key={error ? "error" : "default"}
          className="subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {error ? "❌ Contraseña incorrecta" : "🔒 Acceso restringido"}
        </motion.h2>
      </AnimatePresence>

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
    </section>
  );
};

export default LoginDiv;
