import React from "react";
import Route from "./src/Route";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "app-icons": require("./src/assets/fonts/app_icons.ttf"),
    "Poppins-Black": require("./src/assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("./src/assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("./src/assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("./src/assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("./src/assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("./src/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./src/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./src/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("./src/assets/fonts/Poppins-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Route />;
}
