import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddItems = () => {
  const [imageData, setImageData] = useState(null);
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [cost, setCost] = useState("0");

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setImageData(result);
    } else {
      alert("You did not select any image.");
    }
  };

  const itemUpload = async () => {
    try {
      const newItem = {
        imageUri: imageData ? imageData.assets[0].uri : "",
        title,
        brand,
        cost,
      };

      const existingDataJSON = await AsyncStorage.getItem("myItemsKey");
      let existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];

      existingData.push(newItem);

      const updatedDataJSON = JSON.stringify(existingData);

      await AsyncStorage.setItem("myItemsKey", updatedDataJSON);

      console.log("Item added and saved to AsyncStorage.");
      setTitle("");
      setBrand("");
      setCost("0");
      setImageData(null);
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>Add Items</Text>
        </View>
        {imageData !== null ? (
          <Image
            source={{ uri: imageData.assets[0].uri }}
            style={styles.preview}
          />
        ) : null}
        <TextInput
          placeholder="Enter Item Title"
          style={styles.inputTitle}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          placeholder="Enter Brand"
          style={styles.inputTitle}
          value={brand}
          onChangeText={(text) => setBrand(text)}
        />
        <TextInput
          placeholder="Enter cost in rupees"
          style={styles.inputTitle}
          value={cost}
          onChangeText={(text) => setCost(text)}
        />
        <Pressable style={styles.imagebtn} onPress={pickImageAsync}>
          <Text>Select from gallery</Text>
        </Pressable>
        <Pressable
          style={styles.clear}
          onPress={() => {
            setImageData(null);
          }}
        >
          <Text>Clear image</Text>
        </Pressable>
        <Pressable style={styles.upload} onPress={itemUpload}>
          <Text>Upload item</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    width: "100%",
    backgroundColor: "#fff",
    elevation: 4,
    paddingLeft: 20,
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  inputTitle: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
    alignSelf: "center",
  },
  imagebtn: {
    width: "90%",
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  preview: {
    width: "90%",
    height: 200,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
  },
  clear: {
    marginTop: 10,
    height: 30,
    width: "30%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 20,
    backgroundColor: "#c5bbbb",
    marginBottom: 70,
  },
  upload: {
    width: "60%",
    height: 50,
    borderWidth: 0.5,
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#e7ad27",
  },
});
