import { StyleSheet, Image, Pressable } from "react-native";
import { Text, View } from "./Themed";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useNhostClient } from "@nhost/react";

const Pin = (props) => {
  const { id, image, title } = props.pin;

  const [imageUri, setImageUri] = useState("");
  const [ratio, setRatio] = useState(1);

  const navigation = useNavigation();
  const nhost = useNhostClient();

  const fetchImage = async () => {
    const result = await nhost.storage.getPresignedUrl({
      fileId: image,
    });

    if (result.presignedUrl?.url) {
      setImageUri(result.presignedUrl.url);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [image]);

  useEffect(() => {
    if (image) {
      Image.getSize(imageUri, (width, height) => setRatio(width / height));
    }
  }, [imageUri]);

  const onLike = () => {
    console.warn("Like");
  };

  const goToPinPage = () => {
    navigation.navigate("Pin", { id });
  };

  return (
    <Pressable onPress={goToPinPage} style={styles.pin}>
      <View>
        <Image
          source={{
            uri: imageUri,
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
    </Pressable>
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
