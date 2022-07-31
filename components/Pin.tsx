import { StyleSheet, Image, Pressable } from "react-native";
import { Text, View } from "./Themed";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";

const Pin = (props) => {
  const { image, title } = props.pin;

  const [ratio, setRatio] = useState(1);

  const onLike = () => {
    console.warn("Like");
  };

  useEffect(() => {
    if (image) {
      Image.getSize(image, (width, height) => setRatio(width / height));
    }
  }, [image]);

  return (
    <View style={styles.pin}>
      <View>
        <Image
          source={{
            uri: image,
          }}
          style={[styles.image, { aspectRatio: ratio }]}
        />

        <Pressable onPress={onLike} style={styles.heartBtn}>
          <AntDesign name="hearto" size={16} color="black" />
        </Pressable>
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pin: {
    width: "100%",
    padding: 4,
  },

  title: {
    fontSize: 16,
    lineHeight: 25,
    fontWeight: "600",
    margin: 5,
  },

  image: {
    width: "100%",
    borderRadius: 15,
  },

  heartBtn: {
    backgroundColor: "#D3CFD4",
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 5,
    borderRadius: 50,
  },
});

export default Pin;
