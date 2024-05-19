import React from "react";
import { StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  createDrawerNavigator,
  DrawerItem,
} from "@react-navigation/drawer";

//
import { COLORS, FONTSIZE, SPACING } from "./theme/theme";
import DetailsScreen from "./screens/DetailsScreen";
import PaymentScreen from "./screens/PaymentScreen";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import SignIn from "./screens/authScreens/SignIn";
import SignUp from "./screens/authScreens/SignUp";
import { useAuthStore } from "./store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: any) => {
  const logout = useAuthStore((state: any) => state.logout);
  const username = useAuthStore((state: any) => state.username);

  const clearAllData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log("🚀 ~ clearAllData ~ keys:", keys)
      
      if (keys.length > 0) {
        await AsyncStorage.clear();
        console.log("All data cleared successfully");
      } else {
        console.log("No data to clear in AsyncStorage");
      }
    } catch (error) {
      console.error("Error clearing data:", error);
    }
  };

  return (
    <DrawerContentScrollView>
      <DrawerItem
        label="Logout"
        labelStyle={styles.drawerItem}
        onPress={() => logout()}
      />
      <DrawerItem
        label="clear all data"
        labelStyle={styles.drawerItem}
        onPress={() => clearAllData()}
      />
    </DrawerContentScrollView>
  );
};

const Route = () => {
  const isAuthenticated: boolean = useAuthStore(
    (state: any) => state.isAuthenticated
  );

  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
        screenOptions={({ route }) => ({
          drawerStyle: styles.drawerStyle,
          headerShown: false,
        })}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="TabNavigator" component={TabNavigator} />
      </Drawer.Navigator>
    );
  };

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
          // tabBarBackground: () => (
          //   <BlurView intensity={15} style={styles.BlurViewStyles} />
          // ),
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <FontAwesome
                name="home"
                size={25}
                color={
                  focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                }
              />
            ),
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <FontAwesome
                name="shopping-cart"
                size={25}
                color={
                  focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                }
              />
            ),
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Favorite"
          component={FavoritesScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <AntDesign
                name="like1"
                size={25}
                color={
                  focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                }
              />
            ),
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="History"
          component={OrderHistoryScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Entypo
                name="bell"
                size={25}
                color={
                  focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                }
              />
            ),
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    );
  };

  const AuthenticatedStack = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{ animation: "slide_from_bottom" }}
          ></Stack.Screen>
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ animation: "slide_from_bottom" }}
          ></Stack.Screen>
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{ animation: "slide_from_bottom" }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  const NotAuthenticatedStack = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ animation: "simple_push" }}
          ></Stack.Screen>
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ animation: "slide_from_right" }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  const navigationStack = isAuthenticated ? (
    <AuthenticatedStack />
  ) : (
    <NotAuthenticatedStack />
  );
  return navigationStack;
};

export default Route;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 60,
    position: "absolute",
    alignItems: "flex-end",
    backgroundColor: COLORS.primaryBlackHex,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: "transparent",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  BlurViewStyles: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  drawerItem: {
    fontSize: FONTSIZE.size_20,
    margin: SPACING.space_16,
    fontWeight: "600",
    color: COLORS.primaryRedHex,
  },
  drawerStyle: {
    backgroundColor: COLORS.primaryBrown,
  },
});
