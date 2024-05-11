import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import CoffeeCard from "./CoffeeCard";

interface ProductFlatListProp {
  ListRef: any;
  sortedCoffee: any;
  CoffeeCardAddToCart: any;
  navigation: any;
}

const ProductFlatList: React.FC<ProductFlatListProp> = ({
  ListRef,
  sortedCoffee,
  CoffeeCardAddToCart,
  navigation,
}) => {
  return (
    <FlatList
      ref={ListRef}
      horizontal
      ListEmptyComponent={
        <View style={styles.EmptyListContainer}>
          <Text style={styles.CategoryText}>Not Available</Text>
        </View>
      }
      showsHorizontalScrollIndicator={false}
      data={sortedCoffee}
      contentContainerStyle={styles.FlatListContainer}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.push("Details", {
                index: item.index,
                id: item.id,
                type: item.type,
              });
            }}
          >
            <CoffeeCard
              id={item.id}
              index={item.index}
              type={item.type}
              roasted={item.roasted}
              imagelink_square={item.imagelink_square}
              name={item.name}
              special_ingredient={item.special_ingredient}
              average_rating={item.average_rating}
              price={item.prices[2]}
              buttonPressHandler={CoffeeCardAddToCart}
            />
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default ProductFlatList;

const styles = StyleSheet.create({
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  EmptyListContainer: {
    width: Dimensions.get("window").width - SPACING.space_30 * 2,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.space_36 * 3.6,
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
});
