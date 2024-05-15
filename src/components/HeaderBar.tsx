import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import GradientBGIcon from "./GradientBGIcon";
import ProfilePic from "./ProfilePic";
import { useAuthStore } from "../store/authStore";

interface HeaderBarProps {
  title?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title }) => {
  const logout = useAuthStore((state: any) => state.logout);

  return (
    <View style={styles.HeaderContainer}>
      <TouchableOpacity onPress={logout}>
        <GradientBGIcon
          name="menu"
          color={COLORS.primaryWhiteHex}
          size={FONTSIZE.size_16}
        />
      </TouchableOpacity>
      <Text style={styles.HeaderText}>{title}</Text>
      <ProfilePic />
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    padding: SPACING.space_30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.secondaryBlackRGBA,
  },
});

export default HeaderBar;
