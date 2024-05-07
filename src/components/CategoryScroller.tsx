import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../theme/theme";

interface CategoryScrollerProp {
  categories: any;
  ListRef: any;
  setCategoryIndex: any;
  setSortedCoffee: any;
  getCoffeeList: any;
  CoffeeList: object;
  categoryIndex: any;
}

const CategoryScroller: React.FC<CategoryScrollerProp> = ({
  categories,
  ListRef,
  setCategoryIndex,
  setSortedCoffee,
  getCoffeeList,
  CoffeeList,
  categoryIndex,
}) => {
  const handleCategorySelect = (index: number) => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({ index: index, category: categories[index] });
    setSortedCoffee([...getCoffeeList(categories[index], CoffeeList)]);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.CategoryScrollViewStyle}
    >
      {categories.map((data, index) => (
        <View key={data.id} style={styles.CategoryScrollViewContainer}>
          <TouchableOpacity
            style={styles.CategoryScrollViewItem}
            onPress={() => handleCategorySelect(index)}
          >
            <Text
              style={[
                styles.CategoryText,
                categoryIndex.index === index
                  ? { color: COLORS.primaryOrangeHex }
                  : {},
              ]}
            >
              {data}
            </Text>
            {categoryIndex.index === index && (
              <View style={styles.ActiveCategory} />
            )}
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default CategoryScroller;

const styles = StyleSheet.create({
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem: {
    alignItems: "center",
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
});
