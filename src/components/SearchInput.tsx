import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../theme/theme";

interface SearchInputProp {
  searchCoffee: (test: string) => void;
  searchText: string;
  setSearchText: (test: string) => void;
}

const SearchInput: React.FC<SearchInputProp> = ({
  searchCoffee,
  searchText,
  setSearchText,
}) => {
  return (
    <View style={styles.InputContainerComponent}>
      <TouchableOpacity
        onPress={() => {
          searchCoffee(searchText);
        }}
      >
        <FontAwesome
          style={styles.InputIcon}
          name="search"
          size={FONTSIZE.size_18}
          color={
            searchText.length > 0
              ? COLORS.primaryOrangeHex
              : COLORS.primaryLightGreyHex
          }
        />
      </TouchableOpacity>
      {/*  */}
      <TextInput
        placeholder="Find Your Coffee..."
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
          searchCoffee(text);
        }}
        placeholderTextColor={COLORS.primaryLightGreyHex}
        style={styles.TextInputContainer}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  InputContainerComponent: {
    flexDirection: "row",
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: "center",
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
});
