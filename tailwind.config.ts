import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1280px",
        "2xl": "1280px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#00ADEF",
        bg1: "#292929",
        bg2: "#212121",
        bg3: "#1C1C1C",
      },
    },
  },
  plugins: [],
};

export default config;
