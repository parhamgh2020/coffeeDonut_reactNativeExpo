import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  ScrollView,
  Alert,
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

const SignUp = () => {
  const [values, setValue] = useState<FormValues>({
    username: "",
    password: "",
  });
  const navigation = useNavigation(); // Initialize navigation hook

  const signUp = useAuthStore((state: any) => state.signUp);

  const onChangeText = (value: string, key: keyof FormValues) => {
    setValue((vals: FormValues) => ({
      ...vals,
      [key]: value,
    }));
  };

  const onPressButton = () => {
    if (!values.username || !values.password) {
      Alert.alert("Please provide username and password");
      return;
    }
    const result = signUp(values.username, values.password);
    if (!result.is_succeed) {
      Alert.alert(result.msg);
    }
  };

  const onPressText = () => {
    navigation.navigate("SignIn"); // Navigate to Home screen after successful login
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        style={styles.ScrollViewStyle}
        showsVerticalScrollIndicator={false}
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
          <Button onPress={onPressButton} type={""} children={"Register"} />
          {/* navigate to sign up*/}
          <Pressable style={styles.textContainer} onPress={onPressText}>
            <Text style={styles.text}>Already have account?</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default React.memo(SignUp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backGround,
  },
  ScrollViewStyle: {
    flexGrow: 1,
  },
  formContainer: {
    justifyContent: "center",
    height: Dimensions.get("window").height,
    alignItems: "center",
  },
  textContainer: {},
  text: {
    marginTop: SPACING.space_15,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
  },
});
