import React, { useState } from "react";
import {
  Button,
  Image,
  View,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNhostClient } from "@nhost/react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CREATE_PIN_MUTATION = `
  mutation MyMutation ($image: String!, $title: String) {
    insert_pins(objects: {image: $image, title: $title}) {
      returning {
        created_at
        id
        image
        title
        user_id
      }
    }
  }
`;

export default function CreatePinScreen() {
  const [imageUri, setImageUri] = useState<null | string>(null);
  const [title, setTitle] = useState("");

  const nhost = useNhostClient();
  const navigation = useNavigation();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const uploadFile = async () => {
    if (!imageUri) {
      return {
        error: {
          message: "No image selected",
        },
      };
    }

    const parts = imageUri.split("/");
    const name = parts[parts.length - 1];
    const nameParts = name.split(".");
    const extension = nameParts[nameParts.length - 1];

    const uri =
      Platform.OS === "ios" ? imageUri.replace("file://", "") : imageUri;

    const result = await nhost.storage.upload({
      file: {
        name: "123.png",
        type: `image/${extension}`,
        uri,
      },
    });

    return result;
  };

  const onSubmit = async () => {
    // TODO Upload Image

    const uploadResult = await uploadFile();

    if (result?.error) {
      Alert.alert("Error uploading the image", uploadResult.error.message);
    }

    const result = await nhost.graphql.request(CREATE_PIN_MUTATION, {
      title,
      image: uploadResult.fileMetadata.id,
    });

    console.log(result);

    if (result.error) {
      Alert.alert("Error creating that post", result.error.message);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.root}>
      <Button title="Upload your Pin" onPress={pickImage} />

      {imageUri && (
        <>
          <Image source={{ uri: imageUri }} style={styles.image} />

          <TextInput
            placeholder="Title..."
            style={styles.input}
            placeholderTextColor={"gray"}
            value={title}
            onChangeText={setTitle}
          />

          <Button title="Submit Pin" onPress={onSubmit} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },

  image: {
    width: "100%",
    aspectRatio: 1,
    marginVertical: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    width: "100%",
    color: "gray",
    borderRadius: 5,
    marginVertical: 10,
  },
});
