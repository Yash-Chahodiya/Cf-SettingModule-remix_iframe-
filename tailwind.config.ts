const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    backgroundSize: {
      "4x": "400%",
    },
    extend: {
      fontSize: {
        "13": [
          ".8125rem",
          {
            lineHeight: "1.125rem",
          },
        ],
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
      },
      animation: {
        "bg-toggle": "bg-toggle 3s linear infinite",
        ping: "ping 2s cubic-bezier(0, 0, .2, 1) infinite",
        toggle: "toggle 0.5s",
        "dash-check": "dash-check .2s .2s ease-in-out forwards",
        "dash-circle": " dash .2s ease-in-out",
        "dash-line": " dash .2s .35s ease-in-out forwards",
        "line-loading":
          "line-loading 2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s infinite",
        "line-loading-1":
          "line-loading-1 2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s infinite",
        "line-loading-2":
          "line-loading-2 2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s infinite",
      },
      keyframes: {
        "bg-toggle": {
          "0%, 100%": { "background-position": "0 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        ping: {
          "75%, 100%": { transform: "scale(4)", opacity: "0" },
        },
        toggle: {
          "0%": { transform: "scaleX(1) scaleY(1)" },
          "30%": { transform: "scaleX(0.88) scaleY(0.88)" },
          "60%": { transform: "scaleX(1) scaleY(1)" },
          "90%": { transform: "scaleX(0.88) scaleY(0.88)" },
          "100%": { transform: "scaleX(1) scaleY(1)" },
        },
        "dash-check": {
          "0%": { "stroke-dashoffset": "-100" },
          "100%": { "stroke-dashoffset": "900" },
        },
        dash: {
          "0%": { "stroke-dashoffset": "1000" },
          "100%": { "stroke-dashoffset": "0" },
        },
        "line-loading": {
          "0%": { transform: "scaleX(1)" },
          "50%": { transform: "scaleX(1)" },
          "100%": { transform: "scaleX(0)" },
        },
        "line-loading-1": {
          "0%": { transform: "scaleX(0)" },
          "25%": { transform: "scaleX(1)" },
          "100%": { transform: "scaleX(1)" },
        },
        "line-loading-2": {
          "0%": { transform: "scaleX(0)" },
          "25%": { transform: "scaleX(0)" },
          "50%": { transform: "scaleX(1)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
    },
    colors: {
      transparent: "transparent",
      black: colors?.black,
      white: colors?.white,
      gray: colors?.gray,
      slate: colors?.slate,
      orange: colors?.orange,
      green: {
        ...(colors?.green ?? {}),
        500: "#5baa46",
        600: "#4c8d3a",
        700: "#008000",
      },
      blue: {
        ...(colors?.blue ?? {}),
        50: "#ebf1f9",
        100: "#ECF1F9",
      },
      "primary-gray": {
        20: "#f4f8ff",
        80: "#343a40",
      },
      primary: {
        8: "#22355814",
        50: "#2235580d",
        100: "#2235581a",
        200: "#22355833",
        300: "#2235584d",
        400: "#22355866",
        500: "#22355880",
        600: "#22355899",
        700: "#223558b3",
        800: "#223558cc",
        900: "#223558",
      },
      dark: {
        400: "#404A57",
        500: "#333D49",
        600: "#28313B",
        700: "#15202B",
        800: "#1e2732",
        900: "#131D27",
        950: "#333C45",
      },
      "deep-orange": {
        200: "#FFAB91",
        500: "#ff5400",
      },
      red: {
        ...(colors?.red ?? {}),
        100: "#D2322D",
      },
    },
  },
  plugins: [],
};
