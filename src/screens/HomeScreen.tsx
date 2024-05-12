import {
  Text,
  StatusBar,
  ScrollView,
  StyleSheet,
  FlatList,
  ToastAndroid,
  View,
  Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useStore } from "../store/store";
//
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import SearchInput from "../components/SearchInput";
import CategoryScroller from "../components/CategoryScroller";
import ProductFlatList from "../components/ProductFlatList";

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift("All");
  return categories;
};

const getCoffeeList = (category: string, data: any) => {
  if (category == "All") {
    return data;
  } else {
    let coffeelist = data.filter((item: any) => item.name == category);
    return coffeelist;
  }
};

const HomeScreen = ({ navigation }: any) => {
  console.log("🚀 ~ HomeScreen ~ HomeScreen:", "HomeScreen")

  // store
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  // internal state
  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList)
  );
  const [searchText, setSearchText] = useState("");
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList)
  );

  //
  const ListRef: any = useRef<FlatList>();
  const tabBarHeight = useBottomTabBarHeight();

  // function
  const searchCoffee = (search: string) => {
    console.log("🚀 ~ searchCoffee ~ searchCoffee:", "searchCoffee")

    if (search != "") {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCategoryIndex({ index: 0, category: categories[0] });
      setSortedCoffee([
        ...CoffeeList.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        ),
      ]);
    }
  };

  const CoffeeCardAddToCart = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
    console.log("🚀 ~ HomeScreen ~ CoffeeCardAddToCart:", "CoffeeCardAddToCart")
    
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    });
    calculateCartPrice();
    ToastAndroid.showWithGravity(
      `${name} is Added to Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        {/* App Header */}
        <HeaderBar />
        {/* text title */}
        <Text style={styles.ScreenTitle}>
          Find the best{"\n"}coffee for you
        </Text>
        {/* Search Input */}
        <SearchInput
          searchCoffee={searchCoffee}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        {/* Category Scroller */}
        <CategoryScroller
          categories={categories}
          ListRef={ListRef}
          setCategoryIndex={setCategoryIndex}
          setSortedCoffee={setSortedCoffee}
          getCoffeeList={getCoffeeList}
          CoffeeList={CoffeeList}
          categoryIndex={categoryIndex}
        />
        {/* Coffee Flatlist */}
        <ProductFlatList
          ListRef={ListRef}
          sortedCoffee={sortedCoffee}
          CoffeeCardAddToCart={CoffeeCardAddToCart}
          navigation={navigation}
        />
        {/* Beans Flatlist */}
        <ProductFlatList
          ListRef={ListRef}
          sortedCoffee={BeanList}
          CoffeeCardAddToCart={CoffeeCardAddToCart}
          navigation={navigation}
        />
        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  footer: {
    height: 60,
  },
});
