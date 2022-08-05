import { Entypo, Feather } from "@expo/vector-icons";
import { useSignOut } from "@nhost/react";
import { Image, Pressable, ScrollView, StyleSheet } from "react-native";

import pins from "../assets/data/pins";
import MasonryList from "../components/MasonryList";

import { Text, View } from "../components/Themed";

export default function ProfileScreen() {
  const { signOut } = useSignOut();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icons}>
          <Pressable onPress={signOut}>
            <Text style={styles.icon}>
              <Feather name="share" size={24} />
            </Text>
          </Pressable>

          <Text style={styles.icon}>
            <Entypo name="dots-three-horizontal" size={24} />
          </Text>
        </View>

        <Image
          source={{
            uri: "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/269678755_1561431100889346_7726883027020515628_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeH0JIldqpFBG2juy2_BZ9EP9leBPG1FH5z2V4E8bUUfnGzBgrz4MjLAej3PR_fCKKI056xn5efkBvG89tz1Ck_G&_nc_ohc=PRrk10el684AX-vhv28&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AT9hMHyRTl1OizAUbdjPAKTiEnuo0ePLFx_b7uPfFmauaA&oe=62EE585A",
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
