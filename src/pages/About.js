import React from "react";
import { Button, Text, View } from "react-native";

function About({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Quotes"
        onPress={() => navigation.navigate("Quotes")}
      ></Button>
      <Text>About</Text>
    </View>
  );
}

export default About;
