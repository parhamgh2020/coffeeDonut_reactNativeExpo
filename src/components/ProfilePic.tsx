import React from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { COLORS, SPACING } from "../theme/theme";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useAuthStore } from "../store/authStore";

const ProfilePic = () => {
  const getImagePath = useAuthStore((state: any) => state.getImagePath);
  const updateUserImage = useAuthStore((state: any) => state.updateUserImage);
  // const [image, setImage] = useState(getImagePath());
  const [image, setImage] = useState(getImagePath());

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      updateUserImage(result.assets[0].uri);
    }
  };
  return (
    <TouchableOpacity onPress={pickImage} style={styles.ImageContainer}>
      {image ? (
        <Image source={{ uri: image }} style={styles.Image} />
      ) : (
        <Image
          source={require("../assets/app_images/avatar.png")}
          style={styles.Image}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    borderRadius: SPACING.space_12,
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  Image: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
});

export default ProfilePic;
