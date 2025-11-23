/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Importante: activaste el modo oscuro manual en tu HTML
  theme: {
    extend: {
      colors: {
        primary: "#137fec",
        "background-light": "#f6f7f8",
        "background-dark": "#101922",
        "corporate-blue": "#4A90E2",
        "dark-gray": "#333333",
        "light-gray-bg": "#F8F9FA",
        "accent-green": "#2ECC71",
        "accent-red": "#E74C3C",
        "accent-orange": "#F39C12",
        "border-color-light": "#e5e7eb",
        "border-color-dark": "#374151",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        // Agregamos sans por defecto también para seguridad
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
      },
    },
  },
  plugins: [
    // Si planeas usar formularios, te recomiendo instalar este plugin oficial:
    // npm install -D @tailwindcss/forms
    // require('@tailwindcss/forms'),
  ],
};
