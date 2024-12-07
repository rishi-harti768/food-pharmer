import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
} from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

const newReportPage = () => {
  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
      mediaTypes: ["images"],
      allowsEditing: true,
      selectionLimit: 1,
    });
    if (!result.canceled) {
      proceed(result.assets[0].uri.toString());
    }
  };
  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      mediaTypes: ["images"],
      allowsEditing: true,
      selectionLimit: 1,
    });
    if (!result.canceled) {
      proceed(result.assets[0].uri.toString());
    }
  };
  const proceed = (url: string) => {
    router.navigate({
      pathname: "/uploadimage/[img]",
      params: { img: `${url}` },
    });
    // console.log(url);
  };
  return (
    <View style={styles.root}>
      <ScrollView>
        <Pressable style={styles.captureImage} onPress={openCamera}>
          <Text style={{ textAlign: "center", fontSize: 24, color: "#222a" }}>
            Click here to take a Picture
          </Text>
        </Pressable>
        {/* <View style={styles.captureImage}></View> */}
        <View style={styles.orSection}>
          <View style={{ flex: 1, height: 2, backgroundColor: "#222a" }}></View>
          <Text style={{ fontSize: 16, marginInline: 8 }}>or</Text>
          <View style={{ flex: 1, height: 2, backgroundColor: "#222a" }}></View>
        </View>
        <Button title="Choose from Gallery" onPress={openGallery} />
      </ScrollView>
    </View>
  );
};

export default newReportPage;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  captureImage: {
    aspectRatio: 9 / 16,
    padding: 32,
    width: "80%",
    marginTop: 32,
    margin: "auto",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    borderColor: "#2222",
    borderWidth: 8,
    borderStyle: "dashed",
  },
  orSection: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
});
