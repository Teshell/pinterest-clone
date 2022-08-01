import { useEffect, useState } from "react";

import { Image, Pressable, StyleSheet } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { View, Text } from "../components/Themed";

import { Ionicons } from "@expo/vector-icons";

import pins from "../assets/data/pins";

const PinScreen = () => {
  const pin = pins[1];
  const [ratio, setRatio] = useState(1);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (pin.image) {
      Image.getSize(pin.image, (width, height) => setRatio(width / height));
    }
  }, [pin]);

  const goBack = () => {};

  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <View style={styles.root}>
        <Image
          source={{ uri: pin.image }}
          style={[styles.image, { aspectRatio: ratio }]}
        />

        <Text style={styles.title}>{pin.title}</Text>
      </View>

      <Pressable
        onPress={goBack}
        style={[styles.backBtn, { top: insets.top + 20 }]}
      >
        <Ionicons name={"chevron-back"} size={35} color={"white"} />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  title: {
    margin: 10,
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 35,
  },

  backBtn: {
    position: "absolute",
    left: 10,
  },
});

export default PinScreen;