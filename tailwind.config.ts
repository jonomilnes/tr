import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
      },
      colors: {
        background: "#121212",
        "panel-base": "#111",
        "text-primary": "#f0f0f0",
        "text-muted": "#a0a0a0",
        "text-subtle": "#666",
        accent: "#c9a96e",
      },
    },
  },
  plugins: [],
};
export default config;
