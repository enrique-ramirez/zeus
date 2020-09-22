module.exports = ({ env }) => ({
  plugins: {
    "postcss-import": {},
    "postcss-preset-env": {
      stage: 2,
      features: {
        "custom-media-queries": { preserve: false },
        "image-set-function": {},
      },
    },
    "postcss-hexrgba": {},
    cssnano: env === "production" ? {} : false,
  },
});
