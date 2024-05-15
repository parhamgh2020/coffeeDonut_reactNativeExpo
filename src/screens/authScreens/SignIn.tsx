import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  Alert,
  ScrollView,
  Dimensions,
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
  const navigation = useNavigation();

  const onChangeText = (value: string, key: keyof FormValues) => {
    setValue((vals: FormValues) => ({
      ...vals,
      [key]: value,
    }));
  };

  const onPressButton = () => {
    const result = login(values.username, values.password);
    if (!result.is_succeed) {
      Alert.alert(result.msg);
    }
  };

  const onPressText = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.ScrollViewFlex}
      >
        <View style={styles.formContainer}>
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
      </ScrollView>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backGround,
    flex: 1,
    justifyContent: "center",
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  formContainer:{
    justifyContent: 'center',
    height: Dimensions.get('window').height,
    alignItems: 'center'
  },
  textContainer: {},
  text: {
    marginTop: SPACING.space_15,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
  },
});
