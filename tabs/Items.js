import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ItemComponent = ({ item, onEditPress, onDeletePress }) => {
  const handleEditPress = () => {
    onEditPress(item);
  };

  const handleDeletePress = () => {
    onDeletePress(item);
  };

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
      <View>
        <TouchableOpacity
          onPress={handleEditPress}
          style={[styles.editButton, { marginBottom: 10 }]}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDeletePress}
          style={[styles.editButton, { backgroundColor: "#b02e0a" }]}
        >
          <Text style={styles.editButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Items = () => {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBrand, setEditedBrand] = useState("");
  const [editedCost, setEditedCost] = useState("");

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

  const handleEditPress = (item) => {
    setEditItem(item);
    setEditedTitle(item.title);
    setEditedBrand(item.brand);
    setEditedCost(item.cost);
    setEditModalVisible(true);
  };

  const handleDeleteItem = (itemToDelete) => {
    const updatedItems = items.filter((item) => item !== itemToDelete);

    AsyncStorage.setItem("myItemsKey", JSON.stringify(updatedItems)).then(
      () => {
        setItems(updatedItems);
      }
    );
  };

  const handleEditItem = () => {
    const updatedItems = items.map((item) =>
      item === editItem
        ? {
            ...item,
            title: editedTitle,
            brand: editedBrand,
            cost: editedCost,
          }
        : item
    );

    AsyncStorage.setItem("myItemsKey", JSON.stringify(updatedItems)).then(
      () => {
        setItems(updatedItems);
        setEditModalVisible(false);
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Items</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ItemComponent
            item={item}
            onEditPress={handleEditPress}
            onDeletePress={handleDeleteItem}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => {
          setEditModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Text>Edit Shoe details</Text>
          <TextInput
            placeholder="Edit Title"
            style={styles.input}
            value={editedTitle}
            onChangeText={(text) => setEditedTitle(text)}
          />
          <TextInput
            placeholder="Edit Brand"
            style={styles.input}
            value={editedBrand}
            onChangeText={(text) => setEditedBrand(text)}
          />
          <TextInput
            placeholder="Edit Cost"
            style={styles.input}
            value={editedCost}
            onChangeText={(text) => setEditedCost(text)}
          />
          <View style={styles.btnView}>
            <TouchableOpacity onPress={handleEditItem} style={styles.editBtn}>
              <Text>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setEditModalVisible(false);
              }}
              style={styles.editBtn}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
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
  editButton: {
    backgroundColor: "#e5840e",
    padding: 8,
    borderRadius: 4,
    width: 60,
    alignItems: "center",
    marginLeft: 10,
  },
  editButtonText: {
    fontSize: 14,
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 8,
    borderRadius: 4,
  },
  btnView: {
    flexDirection: "row",
    alignContent: "space-between",
  },
  editBtn: {
    borderRadius: 8,
    marginHorizontal: 10,
    borderWidth: 0.5,
    height: 30,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dfcbc5",
  },
});

export default Items;
