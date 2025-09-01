// app/components/CustomSplash.tsx
import { ImageBackground, StatusBar, View } from "react-native";

export default function SplashScreen() {
  return (
    <View className="flex-1 bg-white">
      <StatusBar hidden />
      <ImageBackground
        source={require("../../assets/images/SplashScreen/splash-screen.png")}
        resizeMode="cover"
        className="absolute inset-0"
      />
    </View>
  );
}