import { View, Text, StatusBar, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView>
        <HeaderBar />
        <Text>HOmeScreen</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
