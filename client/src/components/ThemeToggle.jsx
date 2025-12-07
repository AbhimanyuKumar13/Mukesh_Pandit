import React from "react";
import { FaMoon } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa6";
import { useTheme } from "../context/ThemeContext";
import styles from "./ThemeToggle.module.css"; // optional CSS module

export default function ThemeToggle() {
  const { theme, userTheme, toggle, setTheme } = useTheme();

  return (
    <div className={styles.wrap}>
      <button
        onClick={toggle}
        aria-pressed={theme === "dark"}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className={styles.toggleBtn}
        title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? <FaRegSun className={styles.icon}  /> : <FaMoon className={styles.icon} />}
      </button>

      <button
        onClick={() => setTheme(null)}
        className={styles.systemBtn}
        title="Use system preference"
        aria-label="Use system preference"
      >
        Use system
      </button>
    </div>
  );
}
