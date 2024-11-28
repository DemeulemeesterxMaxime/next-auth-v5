// hooks/useTheme.ts
import { useState, useEffect } from "react";

export default function useTheme() {
  // Initialisation du thème par défaut
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Mise à jour du thème une fois que le composant est monté
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  // Appliquer la classe "dark" ou "light" sur le HTML
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme); // Sauvegarde du thème
  }, [theme]);

  // Fonction pour basculer le thème
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return { theme, toggleTheme };
}
