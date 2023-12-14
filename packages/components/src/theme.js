module.exports = {
  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
    },
    extend: {
      colors: {
        yellow: {
          DEFAULT: "#FFFF00",
          50: "#FFFFB8",
          100: "#FFFFA3",
          200: "#FFFF7A",
          300: "#FFFF52",
          400: "#FFFF29",
          500: "#FFFF00",
          600: "#C7C700",
          700: "#8F8F00",
          800: "#575700",
          900: "#1F1F00",
          950: "#030300",
        },
        cyan: {
          DEFAULT: "#00FFFF",
          50: "#B8FFFF",
          100: "#A3FFFF",
          200: "#7AFFFF",
          300: "#52FFFF",
          400: "#29FFFF",
          500: "#00FFFF",
          600: "#00C7C7",
          700: "#008F8F",
          800: "#005757",
          900: "#001F1F",
          950: "#000303",
        },
      },

      borderRadius: {
        DEFAULT: "10px",
        none: "0",
        sm: "5px",
        md: "10px",
        lg: "18px",
        full: "100%",
        mainContainer: "24px",
        textField: "8px",
        buttonBorderRadius: "200px",
      },

      fontSize: {
        xs: "0.8rem",
        sm: "0.9rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.25rem",
        "5xl": "2.85rem",
        "6xl": "3.25rem",
        "7xl": "4rem",
      },

      transitionTimingFunction: {
        "in-cubic": "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
        "out-cubic": "cubic-bezier(0.215, 0.61, 0.355, 1)",
        "in-out-cubic": "cubic-bezier(0.645, 0.045, 0.355, 1)",
        "in-circ": "cubic-bezier(0.6, 0.04, 0.98, 0.335)",
        "out-circ": "cubic-bezier(0.075, 0.82, 0.165, 1)",
        "in-out-circ": "cubic-bezier(0.785, 0.135, 0.15, 0.86)",
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "in-out-expo": "cubic-bezier(1, 0, 0, 1)",
        "in-quad": "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
        "out-quad": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "in-out-quad": "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
        "in-quart": "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
        "out-quart": "cubic-bezier(0.165, 0.84, 0.44, 1)",
        "in-out-quart": "cubic-bezier(0.77, 0, 0.175, 1)",
        "in-quint": "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
        "out-quint": "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out-quint": "cubic-bezier(0.86, 0, 0.07, 1)",
        "in-sine": "cubic-bezier(0.47, 0, 0.745, 0.715)",
        "out-sine": "cubic-bezier(0.39, 0.575, 0.565, 1)",
        "in-out-sine": "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
        "in-back": "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
        "out-back": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "in-out-back": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
    },
  },
  plugins: [],
};
