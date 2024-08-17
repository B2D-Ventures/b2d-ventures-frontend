import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(select|listbox|divider|popover|button|ripple|spinner|scroll-shadow).js",
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
        white: "#FFFFFF",
        border: "#D9D9D9",
        secondary: "#757575",
        textAreaBg: "#F8FAFC",

      }
    },
  },
  plugins: [nextui()],
};
export default config;
