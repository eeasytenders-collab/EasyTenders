// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push("hcscript");
config.transformer.assetPlugins = ["expo-asset/tools/hashAssetFiles"];
module.exports = withNativeWind(config, { input: "./global.css" });