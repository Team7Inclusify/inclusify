const path = require('path');

module.exports = {
  // Other webpack configuration options...
  resolve: {
    fallback: {
      fs: false, // Disable 'fs' module
      path: require.resolve("path-browserify"), // Provide a fallback for 'path' module
      os: require.resolve("os-browserify/browser"), // Provide a fallback for 'os' module
      crypto: require.resolve("crypto-browserify"), // Provide a fallback for 'crypto' module
    },
  },
};
