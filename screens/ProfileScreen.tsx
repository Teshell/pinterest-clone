import { Entypo, Feather } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet } from "react-native";

import pins from "../assets/data/pins";
import MasonryList from "../components/MasonryList";

import { Text, View } from "../components/Themed";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icons}>
          <Text style={styles.icon}>
            <Feather name="share" size={24} />
          </Text>

          <Text style={styles.icon}>
            <Entypo name="dots-three-horizontal" size={24} />
          </Text>
        </View>

        <Image
          source={{
            uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png",
          }}
          style={styles.image}
        />

        <Text style={styles.title}>Zinedine Hamadi</Text>
        <Text style={styles.subtitle}>206 Followers | 32 Followings</Text>
      </View>

      <MasonryList pins={pins} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },

  subtitle: {
    fontWeight: "600",
    margin: 10,
  },

  image: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 200,
    marginVertical: 10,
  },

  header: {
    alignItems: "center",
  },

  icons: {
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 10,
  },

  icon: {
    paddingHorizontal: 10,
  },
});
