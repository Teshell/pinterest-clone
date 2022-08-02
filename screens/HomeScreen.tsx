import { useState, useEffect } from "react";
import { useNhostClient } from "@nhost/react";

import MasonryList from "../components/MasonryList";
import { Alert } from "react-native";

export default function HomeScreen() {
  const nhost = useNhostClient();

  const [pins, setPins] = useState([]);

  const fetchPins = async () => {
    const res = await nhost.graphql.request(`
      query {
        pins {
          created_at
          id
          image
          title
          user_id
        }
      }
    `);

    if (res.error) {
      Alert.alert("Error fetching the pins");
    } else {
      setPins(res.data.pins);
    }
  };

  useEffect(() => {
    fetchPins();
  }, []);

  return <MasonryList pins={pins} />;
}
