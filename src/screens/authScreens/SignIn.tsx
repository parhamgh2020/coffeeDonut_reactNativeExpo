import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import InputText from "../../components/InputText";
import { COLORS, FONTSIZE, SPACING } from "../../theme/theme";
import Button from "../../components/Button";
import { useAuthStore } from "../../store/authStore";

interface FormValues {
  username: string;
  password: string;
}

const SignIn = () => {
  const [values, setValue] = useState<FormValues>({
    username: "",
    password: "",
  });

  const login = useAuthStore((state: any) => state.login);
  const navigation = useNavigation()

  const onChangeText = (value: string, key: keyof FormValues) => {
    setValue((vals: FormValues) => ({
      ...vals,
      [key]: value,
    }));
  };

  const onPressButton = () => {
    login(values.username, values.password);
  };

  const onPressText = () => {
    navigation.navigate('SignUp')
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {/* form */}
      <InputText
        name={"username"}
        onChangeText={(val: string) => onChangeText(val, "username")}
      />
      <InputText
        name={"password"}
        onChangeText={(val: string) => onChangeText(val, "password")}
        secureTextEntry
      />
      {/* button */}
      <Button onPress={onPressButton} type={"blue"} children={"Sign in"} />
      {/* navigate to sign up*/}
      <Pressable style={styles.textContainer} onPress={onPressText}>
        <Text style={styles.text}>did not register yet?</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backGround,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {},
  text: {
    marginTop: SPACING.space_15,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
  },
});
