import daisyui from "daisyui";

export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
  ],
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"],
  },
};