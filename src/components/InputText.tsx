import React from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TextInput } from "react-native";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../theme/theme";

interface IconProp {
  name: string;
  size: number;
  color: string;
  style?: any;
}

const Icon: React.FC<IconProp> = ({ name, size, color, style }) => {
  if (name === "username") {
    return <AntDesign name="user" size={size} color={color} style={style} />;
  } else if (name === "password") {
    return (
      <MaterialIcons name="password" size={size} color={color} style={style} />
    );
  } else {
    return null;
  }
};

interface InputTextProp {
  name: string;
  onChangeText?: (val: string) => void;
  secureTextEntry?: boolean;
}

const InputText: React.FC<InputTextProp> = React.memo(({ name, ...props }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.InputContainerComponent}
      colors={[COLORS.primaryBlackHex, COLORS.primaryBrown]}
    >
      <Icon
        name={name}
        size={FONTSIZE.size_18}
        color={COLORS.primaryWhiteHex}
        style={styles.Icon}
      />
      {/*  */}
      <TextInput
        placeholder={name}
        placeholderTextColor={COLORS.primaryWhiteHex}
        
        style={styles.TextInputContainer}
        {...props}
      />
    </LinearGradient>
  );
});

export default React.memo(InputText);

const styles = StyleSheet.create({
  InputContainerComponent: {
    flexDirection: "row",
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: "center",
    paddingHorizontal: SPACING.space_10,
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  Icon: {
    marginHorizontal: SPACING.space_10,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
});
