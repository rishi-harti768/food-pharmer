import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

const Index = () => {
  const pickImage = async () => {
    /* let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      mediaTypes: ["images"],
      base64: true,
      allowsEditing: true,
    }); */
    /* const result = await ImagePicker.launchCameraAsync({
      quality: 1,
      mediaTypes: ["images"],
      base64: true,
      allowsEditing: true,
    }); */
  };

  return (
    <>
      <View style={styles.root}>
        <Text>Home page</Text>
        <Button title="New report" onPress={() => router.push("/new-report")} />
      </View>
    </>
  );
};
export default Index;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
