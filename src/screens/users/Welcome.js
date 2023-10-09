import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "../../../components/ui/CustomHeader";

const ItemComponent = ({ item }) => {
  return (
    <View style={[styles.itemContainer, { backgroundColor: "#e7e3e3" }]}>
      {item.imageUri && (
        <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
      )}
      <View style={styles.itemInfoContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemBrand}>{item.brand}</Text>
        <Text style={styles.itemCost}>INR {item.cost}</Text>
      </View>
    </View>
  );
};

const Welcome = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const retrieveItemsFromStorage = async () => {
      try {
        const itemsJSON = await AsyncStorage.getItem("myItemsKey");
        if (itemsJSON) {
          const parsedItems = JSON.parse(itemsJSON);
          setItems(parsedItems);
        }
      } catch (error) {
        console.error("Error retrieving items from AsyncStorage:", error);
      }
    };

    retrieveItemsFromStorage();
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader title="Welcome to ShoeCart!" />
      <FlatList
        data={items}
        renderItem={({ item }) => <ItemComponent item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  itemInfoContainer: {
    flex: 1,
    marginRight: 10,
    marginLeft: 30,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemBrand: {
    fontSize: 16,
    color: "#555",
    fontWeight: "bold",
  },
  itemCost: {
    fontSize: 16,
    color: "green",
  },
  itemImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: 8,
  },
});

export default Welcome;
