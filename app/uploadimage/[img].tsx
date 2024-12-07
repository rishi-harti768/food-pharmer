import { Image, StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const def = require("../../assets/images/partial-react-logo.png");

const uploadImgPage = () => {
  const { img }: any = useLocalSearchParams();
  const uploadSeclectedImg = () => {
    const formdata = new FormData();
    formdata.append("file", { uri: img } as any);
  };
  return (
    <>
      <View style={styles.root}>
        <View style={styles.imageHolder}>
          <Image
            source={{ uri: img }}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </View>
        <Button title="Done" onPress={uploadSeclectedImg} />
      </View>
    </>
  );
};

export default uploadImgPage;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingBottom: 32,
  },
  imageHolder: {
    width: "100%",
    flex: 1,
  },
});
