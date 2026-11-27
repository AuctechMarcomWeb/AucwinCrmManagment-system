/** @type {import('tailwindcss').Config} */
// AucWin brand: navy #0F2F58 + teal #12ACA2 (taken from the logo).
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // navy – headings, sidebar, dark surfaces
        ink: { DEFAULT: "#0F2F58", 2: "#173D6E", 3: "#2A5185", 900: "#0A2142", 950: "#071831" },
        mist: { DEFAULT: "#F1F4F8", 2: "#E4E9F0", 3: "#D3DBE5" },
        // teal – brand accent. 500 = logo teal, 600 = buttons (white text passes AA)
        teal: {
          50: "#E8F7F6",
          100: "#C9EEEB",
          200: "#94DCD6",
          300: "#5CC8BF",
          400: "#2FB8AE",
          500: "#12ACA2",
          600: "#0B857D",
          700: "#09766F",
          800: "#075D58",
          900: "#054541",
        },
        amber: { 50: "#FFF4ED", 100: "#FFE4D1", 600: "#C2410C", 700: "#9A3412" },
        moss: { 50: "#ECF6EF", 600: "#2F7D4A", 700: "#256339" },
        plum: { 50: "#F3EEF8", 600: "#6B4A9E" },
        slate: { 50: "#F7F9FB", 100: "#EEF2F6", 200: "#E3E9F0", 300: "#CBD5DF", 400: "#94A3B8", 500: "#64748B", 600: "#475569", 700: "#334155", 800: "#1E293B", 900: "#0F172A" },
      },
      fontFamily: { sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"] },
      borderRadius: { xl: "14px", "2xl": "18px" },
      boxShadow: {
        pop: "0 24px 60px -18px rgba(15,47,88,.35)",
        ring: "0 0 0 1px #E4E9F0",
        card: "0 1px 2px rgba(15,47,88,.04), 0 2px 10px -4px rgba(15,47,88,.08)",
        lift: "0 10px 30px -12px rgba(15,47,88,.22)",
        brand: "0 6px 16px -6px rgba(11,133,125,.55)",
      },
    },
  },
  plugins: [],
};
