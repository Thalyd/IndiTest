const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@Components": path.resolve(__dirname, "src/components/shared"),
      "@Config": path.resolve(__dirname, "src/config"),
      "@Utils": path.resolve(__dirname, "src/components/shared/utils"),
      "@Modules": path.resolve(__dirname, "src/components/modules"),
      "@Api": path.resolve(__dirname, "src/api"),
      "@Hooks": path.resolve(__dirname, "src/hooks"),
    },
  },
};
