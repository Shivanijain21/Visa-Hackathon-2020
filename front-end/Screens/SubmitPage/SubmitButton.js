import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import ScreenNames from "../Names";
import { setSafeData } from "../../Helpers/SecureStorageHelper";

const styles = StyleSheet.create({
  Button: {
    height: 68,
    backgroundColor: "#FDBB0A",
  },
  Text: {
    fontSize: 28,
  },
  Container: {},
});

export default function ({ navigate, username, password }) {
  const Submit = () => {
    setSafeData("userName", username);
    navigate(ScreenNames.SetUpSuccessScreen);
  };
  return (
    <View style={styles.Container}>
      <Button
        contentStyle={styles.Button}
        labelStyle={styles.Text}
        mode="contained"
        onPress={() => Submit()}
      >
        Submit
      </Button>
    </View>
  );
}
