import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // - Official Brand Colors
        primary: "#EEAB40",    // Honey Bronze (CTAs)
        secondary: "#49C1C7",  // Strong Cyan (Accents)
        base: "#01121C",       // Ink Black (Backgrounds)
        tertiary: "#0B354D",   // Deep Space Blue (Nav/Footer)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], //
      },
    },
  },
  plugins: [],
};
export default config;