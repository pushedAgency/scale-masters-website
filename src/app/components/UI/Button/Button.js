"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/components/UI/Button/Button.module.css";

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  href = "",
}) {
  const router = useRouter();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (href) router.push(href);
  };

  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
