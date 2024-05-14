import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS,FONTSIZE,SPACING } from "../theme/theme";

interface ButtonProp {
  onPress: () => void;
  type?: string;
  children: string;
  style?: any;
}

const Button: React.FC<ButtonProp> = ({ onPress, type, children }) => {
  return (
    <TouchableOpacity
      style={[styles.container, type === "blue" ? styles.blueBg : {}]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(Button);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryGreen,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDERRADIUS.radius_15,
    padding: SPACING.space_10,
    marginVertical: SPACING.space_10,
    width: "80%",
    alignSelf: "center",
  },
  text: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontWeight: "bold",
  },
  blueBg: {
    backgroundColor: COLORS.realBlue,
  },
});
