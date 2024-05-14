import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
//
import { COLORS } from "./theme/theme";
import DetailsScreen from "./screens/DetailsScreen";
import PaymentScreen from "./screens/PaymentScreen";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import SignIn from "./screens/authScreens/SignIn";
import SignUp from "./screens/authScreens/SignUp";
import { useAuthStore } from "./store/authStore";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Route = () => {
  const isAuthenticated: boolean = useAuthStore(
    (state: any) => state.isAuthenticated
  );

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
            name="Tab"
            component={TabNavigator}
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
  console.log("🚀 ~ Route ~ isAuthenticated:", isAuthenticated)

  const navigationStack = false ? (
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
});
