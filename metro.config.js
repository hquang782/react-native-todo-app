const { getDefaultConfig } = require("expo/metro-config");
const config = getDefaultConfig(__dirname, {
    // Disable CSS support.
    isCSSEnabled: false,
  });
config.resolver.assetExts.push('cjs');
module.exports = config;
