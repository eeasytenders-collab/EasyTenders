/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1e4278",
        accent: "#2cbbbb",
        warning: "#fe7d50",
        danger: "#fa6989",
        tagBg: "#ffd1c5",
        tagText: "#e36c4c",
        cardBg: "#e2e8f0",
        textMuted: "#64748b",
        border: "#334155",
        borderLight: "#cbd5e1",
        blueDark: "#4d74ae",
        accentDark: "#123f79",
        blueLight: "#93c5fd",
        bgLight: "#f8fafc",
        divider: "#eef2f7",
        yellow: "#f59e0b",
        purple: "#6d28d9",
        green: "#16a34a",
        blue: "#2563eb",
        ripple: "#e5e7eb",
        rippleAlt: "#e6edf7",
      },
    },
  },
  plugins: [],
};