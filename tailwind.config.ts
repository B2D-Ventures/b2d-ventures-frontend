import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        desktop: "1440px"
      },
      colors: {
        green: "#149D52",
        yellow: "#FFD700",
        red: "#EA4335",
        purple: "#9710FF",
        darkPurple: "#4E0A81",
        black: "#000000",
        border: "#D9D9D9",
        secondary: "#757575",
        textAreaBg: "#F8FAFC",

      }
    },
  },
  plugins: [],
};
export default config;
