const path = require(`path`);
const sassResourcesLoader = require('craco-sass-resources-loader');


module.exports = {
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: './src/features/document/components/styles.scss'
      },
    },
  ],
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
